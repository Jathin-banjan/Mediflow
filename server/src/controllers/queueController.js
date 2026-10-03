const Queue = require('../models/Queue');
const QueueEntry = require('../models/QueueEntry');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');
const { calculateEstimatedWait } = require('../utils/queueHelper');
const { emitQueueUpdate, emitUserNotification } = require('../sockets/queueSocket');

// @desc    Get active queues for a hospital / department / doctor
// @route   GET /api/queues
// @access  Public
const getQueues = async (req, res) => {
  try {
    const { hospital, department, doctor } = req.query;
    let query = {};
    if (hospital) query.hospital = hospital;
    if (department) query.department = department;
    if (doctor) query.doctor = doctor;

    const queues = await Queue.find(query)
      .populate('hospital', 'name')
      .populate('department', 'name code status')
      .populate('doctor', 'name specialty avatar');

    // Get active entries for each queue
    const enhancedQueues = await Promise.all(
      queues.map(async (q) => {
        const entries = await QueueEntry.find({
          queue: q._id,
          status: { $in: ['WAITING', 'CALLED', 'IN-CONSULTATION'] }
        })
          .populate('patient', 'name avatar')
          .populate('appointment', 'appointmentNumber reason timeSlot')
          .sort({ position: 1 });

        return {
          ...q.toObject(),
          entries
        };
      })
    );

    res.json({ success: true, count: enhancedQueues.length, data: enhancedQueues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single queue by ID with full patient list
// @route   GET /api/queues/:id
// @access  Public
const getQueueById = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id)
      .populate('hospital', 'name address')
      .populate('department', 'name code floor status')
      .populate('doctor', 'name specialty avatar avgConsultationMinutes');

    if (!queue) {
      return res.status(404).json({ success: false, message: 'Queue not found' });
    }

    const entries = await QueueEntry.find({ queue: queue._id })
      .populate('patient', 'name avatar email phone')
      .populate('appointment')
      .sort({ position: 1 });

    res.json({
      success: true,
      data: {
        ...queue.toObject(),
        entries
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Doctor Queue Action: Call Next, Start, Complete, Skip, Pause
// @route   POST /api/queues/:id/action
// @access  Private (DOCTOR, HOSPITAL_ADMIN)
const handleQueueAction = async (req, res) => {
  try {
    const { action, entryId } = req.body; // action: 'CALL_NEXT', 'START', 'COMPLETE', 'SKIP', 'NO_SHOW', 'TOGGLE_PAUSE'
    const queue = await Queue.findById(req.params.id).populate('doctor department');
    if (!queue) {
      return res.status(404).json({ success: false, message: 'Queue not found' });
    }

    let message = '';
    let updatedEntry = null;

    if (action === 'TOGGLE_PAUSE') {
      queue.status = queue.status === 'PAUSED' ? 'ACTIVE' : 'PAUSED';
      await queue.save();
      message = `Queue status set to ${queue.status}`;
    } else if (action === 'CALL_NEXT') {
      // Find the next WAITING entry
      const nextEntry = await QueueEntry.findOne({
        queue: queue._id,
        status: 'WAITING'
      }).sort({ position: 1 }).populate('patient appointment');

      if (!nextEntry) {
        return res.status(400).json({ success: false, message: 'No waiting patients in queue' });
      }

      nextEntry.status = 'CALLED';
      nextEntry.startTime = new Date();
      await nextEntry.save();

      queue.currentServingToken = nextEntry.tokenNumber;
      await queue.save();

      // Update appointment status
      await Appointment.findByIdAndUpdate(nextEntry.appointment._id, { status: 'IN-CONSULTATION' });

      // Notify patient via Socket & DB Notification
      const notification = await Notification.create({
        user: nextEntry.patient._id,
        title: 'Your Token Called!',
        message: `Token ${nextEntry.tokenNumber}: Dr. ${queue.doctor ? queue.doctor.name : 'Doctor'} is ready for you now in Room / Cabin.`,
        type: 'QUEUE'
      });

      emitUserNotification(nextEntry.patient._id.toString(), notification);
      updatedEntry = nextEntry;
      message = `Called next patient with token ${nextEntry.tokenNumber}`;
    } else if (action === 'START' && entryId) {
      updatedEntry = await QueueEntry.findByIdAndUpdate(entryId, { status: 'IN-CONSULTATION', startTime: new Date() }, { new: true });
      if (updatedEntry) {
        await Appointment.findByIdAndUpdate(updatedEntry.appointment, { status: 'IN-CONSULTATION' });
      }
      message = 'Consultation started';
    } else if (action === 'COMPLETE' && entryId) {
      updatedEntry = await QueueEntry.findByIdAndUpdate(entryId, { status: 'COMPLETED', endTime: new Date() }, { new: true });
      if (updatedEntry) {
        await Appointment.findByIdAndUpdate(updatedEntry.appointment, { status: 'COMPLETED' });
        if (queue.waitingPatientsCount > 0) {
          queue.waitingPatientsCount -= 1;
          await queue.save();
        }
      }
      message = 'Consultation completed';
    } else if ((action === 'SKIP' || action === 'NO_SHOW') && entryId) {
      const statusStr = action === 'SKIP' ? 'SKIPPED' : 'NO-SHOW';
      updatedEntry = await QueueEntry.findByIdAndUpdate(entryId, { status: statusStr }, { new: true });
      if (updatedEntry) {
        await Appointment.findByIdAndUpdate(updatedEntry.appointment, { status: statusStr });
        if (queue.waitingPatientsCount > 0) {
          queue.waitingPatientsCount -= 1;
          await queue.save();
        }
      }
      message = `Patient marked as ${statusStr}`;
    }

    // Re-calculate estimated waiting time for all remaining WAITING entries
    const waitingEntries = await QueueEntry.find({ queue: queue._id, status: 'WAITING' }).sort({ position: 1 });
    const avgConsult = queue.doctor ? (queue.doctor.avgConsultationMinutes || 15) : 15;

    for (let i = 0; i < waitingEntries.length; i++) {
      const estWait = calculateEstimatedWait(i, avgConsult);
      waitingEntries[i].estimatedWaitMinutes = estWait;
      await waitingEntries[i].save();
    }

    // Broadcast Socket update to queue room
    emitQueueUpdate(queue._id.toString(), {
      queueId: queue._id,
      currentServingToken: queue.currentServingToken,
      waitingPatientsCount: queue.waitingPatientsCount,
      status: queue.status,
      lastAction: action,
      updatedEntry
    });

    res.json({
      success: true,
      message,
      data: {
        queue,
        updatedEntry,
        waitingCount: queue.waitingPatientsCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getQueues,
  getQueueById,
  handleQueueAction
};
