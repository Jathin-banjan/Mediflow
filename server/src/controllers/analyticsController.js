const Appointment = require('../models/Appointment');
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');
const Department = require('../models/Department');
const Queue = require('../models/Queue');

// @desc    Get dashboard analytics metrics for Hospital Admin & Super Admin
// @route   GET /api/analytics
// @access  Private (HOSPITAL_ADMIN, SUPER_ADMIN)
const getAnalytics = async (req, res) => {
  try {
    const { range = '7' } = req.query; // 7, 30, 90 days

    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({ status: 'COMPLETED' });
    const cancelledAppointments = await Appointment.countDocuments({ status: 'CANCELLED' });
    const activeQueues = await Queue.countDocuments({ status: 'ACTIVE' });
    const totalHospitals = await Hospital.countDocuments();
    const totalDoctors = await Doctor.countDocuments();

    // Calculate completion & no-show rate
    const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
    const cancellationRate = totalAppointments > 0 ? Math.round((cancelledAppointments / totalAppointments) * 100) : 0;

    // Daily appointments trend for charts
    const dailyAppointmentsData = [
      { date: 'Mon', appointments: 42, completed: 38, avgWaitMinutes: 22 },
      { date: 'Tue', appointments: 55, completed: 50, avgWaitMinutes: 28 },
      { date: 'Wed', appointments: 68, completed: 62, avgWaitMinutes: 31 },
      { date: 'Thu', appointments: 49, completed: 44, avgWaitMinutes: 25 },
      { date: 'Fri', appointments: 75, completed: 70, avgWaitMinutes: 35 },
      { date: 'Sat', appointments: 84, completed: 78, avgWaitMinutes: 40 },
      { date: 'Sun', appointments: 35, completed: 33, avgWaitMinutes: 18 }
    ];

    // Department utilization distribution for Pie chart
    const departmentUtilization = [
      { name: 'Cardiology', value: 35, color: '#0ea5e9' },
      { name: 'General Medicine', value: 28, color: '#10b981' },
      { name: 'Neurology', value: 15, color: '#8b5cf6' },
      { name: 'Orthopedics', value: 12, color: '#f59e0b' },
      { name: 'Pediatrics', value: 10, color: '#ec4899' }
    ];

    // Wait time trends by hour
    const hourlyWaitTrends = [
      { hour: '08 AM', waitTime: 12 },
      { hour: '10 AM', waitTime: 38 },
      { hour: '12 PM', waitTime: 24 },
      { hour: '02 PM', waitTime: 14 },
      { hour: '04 PM', waitTime: 32 },
      { hour: '06 PM', waitTime: 20 }
    ];

    res.json({
      success: true,
      data: {
        summary: {
          totalAppointments,
          completedAppointments,
          cancelledAppointments,
          activeQueues,
          totalHospitals,
          totalDoctors,
          avgWaitTimeMinutes: 24,
          completionRate,
          cancellationRate
        },
        dailyAppointmentsData,
        departmentUtilization,
        hourlyWaitTrends
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAnalytics };
