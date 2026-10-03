const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Department = require('../models/Department');
const Queue = require('../models/Queue');
const QueueEntry = require('../models/QueueEntry');
const Notification = require('../models/Notification');
const { generateAppointmentNumber, generateTokenNumber, calculateEstimatedWait } = require('../utils/queueHelper');
const { emitQueueUpdate, emitUserNotification } = require('../sockets/queueSocket');

// @desc    Book a new appointment with strict conflict prevention
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, hospitalId, departmentId, date, timeSlot, consultationType, reason } = req.body;
    const patientId = req.user._id;

    if (!doctorId || !hospitalId || !departmentId || !date || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Please provide doctor, hospital, department, date and time slot' });
    }

    // 1. Conflict Prevention: Check if slot is already booked for this doctor & date
    const existingBooking = await Appointment.findOne({
      doctor: doctorId,
      date,
      timeSlot,
      status: { $nin: ['CANCELLED'] }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'This time slot has already been booked. Please choose another slot.'
      });
    }

    // 2. Generate unique appointment number
    const appointmentNumber = generateAppointmentNumber();

    const appointment = await Appointment.create({
      appointmentNumber,
      patient: patientId,
      doctor: doctorId,
      hospital: hospitalId,
      department: departmentId,
      date,
      timeSlot,
      consultationType: consultationType || 'In-person',
      reason: reason || 'General Consultation',
      status: 'BOOKED'
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'name specialty avatar consultationFee')
      .populate('hospital', 'name address phone')
      .populate('department', 'name code');

    // Create confirmation notification
    const notification = await Notification.create({
      user: patientId,
      title: 'Appointment Confirmed',
      message: `Your appointment ${appointmentNumber} with ${populatedAppointment.doctor.name} for ${date} at ${timeSlot} is confirmed.`,
      type: 'APPOINTMENT'
    });

    emitUserNotification(patientId.toString(), notification);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: populatedAppointment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This appointment slot was booked concurrently by another user. Please select a different time slot.'
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get appointments for logged-in user (patient or doctor)
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'PATIENT') {
      query.patient = req.user._id;
    } else if (req.user.role === 'DOCTOR') {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (doctor) {
        query.doctor = doctor._id;
      } else {
        return res.json({ success: true, count: 0, data: [] });
      }
    } else if (req.user.role === 'HOSPITAL_ADMIN') {
      query.hospital = req.user.hospital;
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone avatar')
      .populate('doctor', 'name specialty avatar qualification consultationFee')
      .populate('hospital', 'name address phone')
      .populate('department', 'name code')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get appointment details by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name email phone avatar emergencyContact')
      .populate('doctor', 'name specialty avatar qualification consultationFee')
      .populate('hospital', 'name address phone tagline')
      .populate('department', 'name code floor');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Digital Check-In for appointment & Live Queue Token Generation
// @route   POST /api/appointments/:id/check-in
// @access  Private (PATIENT)
const checkInAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('department')
      .populate('doctor');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.status === 'CHECKED-IN' || appointment.status === 'WAITING' || appointment.status === 'IN-CONSULTATION') {
      return res.status(400).json({ success: false, message: 'Already checked in for this appointment' });
    }

    if (appointment.status === 'CANCELLED' || appointment.status === 'COMPLETED') {
      return res.status(400).json({ success: false, message: `Cannot check-in for an appointment with status ${appointment.status}` });
    }

    // 1. Find or create queue for doctor/department
    let queue = await Queue.findOne({
      hospital: appointment.hospital,
      department: appointment.department._id,
      doctor: appointment.doctor._id
    });

    if (!queue) {
      queue = await Queue.create({
        hospital: appointment.hospital,
        department: appointment.department._id,
        doctor: appointment.doctor._id,
        name: `${appointment.doctor.name} - ${appointment.department.name} Queue`,
        totalPatientsToday: 0,
        waitingPatientsCount: 0
      });
    }

    // 2. Increment queue sequence and assign token
    queue.totalPatientsToday += 1;
    queue.waitingPatientsCount += 1;
    await queue.save();

    const tokenNumber = generateTokenNumber(appointment.department.code || 'GEN', queue.totalPatientsToday);
    const position = queue.waitingPatientsCount;
    const patientsAhead = position - 1;
    const estWait = calculateEstimatedWait(patientsAhead, appointment.doctor.avgConsultationMinutes || 15);

    // 3. Update appointment
    appointment.status = 'WAITING';
    appointment.tokenNumber = tokenNumber;
    appointment.queuePosition = position;
    appointment.estimatedWaitMinutes = estWait;
    await appointment.save();

    // 4. Create QueueEntry
    const queueEntry = await QueueEntry.create({
      queue: queue._id,
      appointment: appointment._id,
      patient: appointment.patient,
      tokenNumber,
      position,
      status: 'WAITING',
      estimatedWaitMinutes: estWait
    });

    // 5. Emit Socket.IO updates to room queue:<queueId> and user:<patientId>
    emitQueueUpdate(queue._id.toString(), {
      queueId: queue._id,
      currentServingToken: queue.currentServingToken,
      waitingPatientsCount: queue.waitingPatientsCount,
      latestTokenAdded: tokenNumber
    });

    const notification = await Notification.create({
      user: appointment.patient,
      title: 'Digital Token Issued',
      message: `Checked in! Your token is ${tokenNumber}. Estimated wait time is ${estWait} minutes (${patientsAhead} patients ahead).`,
      type: 'QUEUE'
    });

    emitUserNotification(appointment.patient.toString(), notification);

    res.json({
      success: true,
      message: 'Checked in successfully',
      data: {
        appointment,
        tokenNumber,
        queuePosition: position,
        patientsAhead,
        estimatedWaitMinutes: estWait,
        queueId: queue._id
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = 'CANCELLED';
    await appointment.save();

    res.json({ success: true, message: 'Appointment cancelled', data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reschedule appointment
// @route   PUT /api/appointments/:id/reschedule
// @access  Private
const rescheduleAppointment = async (req, res) => {
  try {
    const { date, timeSlot } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Check conflict for new date/timeSlot
    const conflict = await Appointment.findOne({
      doctor: appointment.doctor,
      date,
      timeSlot,
      status: { $nin: ['CANCELLED'] },
      _id: { $ne: appointment._id }
    });

    if (conflict) {
      return res.status(409).json({ success: false, message: 'The requested time slot is not available.' });
    }

    appointment.date = date;
    appointment.timeSlot = timeSlot;
    appointment.status = 'BOOKED';
    await appointment.save();

    res.json({ success: true, message: 'Appointment rescheduled successfully', data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  getAppointmentById,
  checkInAppointment,
  cancelAppointment,
  rescheduleAppointment
};
