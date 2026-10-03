import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useSocket } from '../context/SocketContext';
import { appointmentAPI } from '../services/api';
import { DigitalTokenCard } from '../components/DigitalTokenCard';
import {
  Calendar,
  Clock,
  Search,
  UserCheck,
  Building2,
  Stethoscope,
  Bell,
  AlertTriangle,
  History,
  CheckCircle2,
  FileText,
  Activity,
  PlusCircle,
  Compass
} from 'lucide-react';

export const PatientDashboard = () => {
  const { user } = useAuth();
  const { addToast, notifications, unreadCount } = useNotification();
  const { joinQueueRoom, socket } = useSocket();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'history', 'notifications'

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await appointmentAPI.getAppointments();
      if (res.data.success) {
        setAppointments(res.data.data);

        // Join socket rooms for any checked-in appointments
        res.data.data.forEach((appt) => {
          if (appt.queueId) joinQueueRoom(appt.queueId);
        });
      }
    } catch (err) {
      console.error('Failed to load patient appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Socket listener for real-time queue updates
  useEffect(() => {
    if (socket) {
      const handleQueueUpdate = () => {
        fetchAppointments();
      };
      socket.on('queue_updated', handleQueueUpdate);
      return () => {
        socket.off('queue_updated', handleQueueUpdate);
      };
    }
  }, [socket]);

  const handleCheckIn = async (appointmentId) => {
    try {
      const res = await appointmentAPI.checkIn(appointmentId);
      if (res.data.success) {
        addToast(`Checked in! Token issued: ${res.data.data.tokenNumber}`, 'success');
        fetchAppointments();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Check-in failed.', 'error');
    }
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const res = await appointmentAPI.cancel(appointmentId);
        if (res.data.success) {
          addToast('Appointment cancelled.', 'info');
          fetchAppointments();
        }
      } catch (err) {
        addToast(err.response?.data?.message || 'Cancellation failed.', 'error');
      }
    }
  };

  const activeAppt = appointments.find((a) => ['WAITING', 'CALLED', 'IN-CONSULTATION'].includes(a.status));
  const upcomingAppts = appointments.filter((a) => ['BOOKED', 'WAITING', 'CALLED', 'IN-CONSULTATION'].includes(a.status));
  const pastAppts = appointments.filter((a) => ['COMPLETED', 'CANCELLED', 'NO-SHOW'].includes(a.status));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block">Patient Dashboard</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome back, {user?.name}</h1>
          <p className="text-xs text-slate-400 mt-1">Manage your live patient queue tokens, visits, and doctor consultations.</p>
        </div>
        <Link
          to="/book-appointment"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Book Appointment
        </Link>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { title: 'Find Doctor', link: '/doctors', icon: Stethoscope, color: 'text-teal-400' },
          { title: 'Book Slot', link: '/book-appointment', icon: Calendar, color: 'text-emerald-400' },
          { title: 'Find Hospital', link: '/hospitals', icon: Building2, color: 'text-cyan-400' },
          { title: 'Smart Planner', link: '/planner', icon: Compass, color: 'text-amber-400' },
          { title: 'Emergency', link: '/emergency', icon: AlertTriangle, color: 'text-rose-400' }
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className="p-4 rounded-2xl glass-card border border-slate-800 hover:border-teal-500/40 transition-all duration-200 flex flex-col items-center text-center gap-2 group"
          >
            <div className={`w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200">{item.title}</span>
          </Link>
        ))}
      </div>

      {/* Active Live Token Banner Card if checked-in */}
      {activeAppt && (
        <div className="space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-teal-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400 animate-pulse" />
            Active Live Patient Token
          </h2>
          <DigitalTokenCard appointment={activeAppt} onCheckIn={handleCheckIn} onCancel={handleCancel} />
        </div>
      )}

      {/* Dashboard Tabs Section */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`text-sm font-bold pb-2 transition-colors relative ${
              activeTab === 'upcoming' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Upcoming Appointments ({upcomingAppts.length})
            {activeTab === 'upcoming' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full"></span>}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`text-sm font-bold pb-2 transition-colors relative ${
              activeTab === 'history' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Past Visit History ({pastAppts.length})
            {activeTab === 'history' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full"></span>}
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`text-sm font-bold pb-2 transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'notifications' ? 'text-teal-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Notifications ({unreadCount})
            {activeTab === 'notifications' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full"></span>}
          </button>
        </div>

        {/* Tab 1: Upcoming Appointments */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingAppts.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">No upcoming appointments found.</p>
                <Link to="/book-appointment" className="inline-block text-xs font-bold text-teal-400 hover:underline">
                  Book a new consultation →
                </Link>
              </div>
            ) : (
              upcomingAppts.map((appt) => (
                <DigitalTokenCard key={appt._id} appointment={appt} onCheckIn={handleCheckIn} onCancel={handleCancel} />
              ))
            )}
          </div>
        )}

        {/* Tab 2: Past Visit History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {pastAppts.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No past visit records found.</div>
            ) : (
              pastAppts.map((appt) => (
                <div key={appt._id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">{appt.date} • {appt.timeSlot}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        appt.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-300'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{appt.doctor?.name}</h4>
                    <p className="text-xs text-slate-400">{appt.department?.name} • {appt.hospital?.name}</p>
                    {appt.doctorNotes && (
                      <p className="text-xs text-teal-300/90 italic pt-1">Doctor Notes: "{appt.doctorNotes}"</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Notifications Center */}
        {activeTab === 'notifications' && (
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No notifications available.</div>
            ) : (
              notifications.map((notif) => (
                <div key={notif._id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                  <Bell className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">{notif.title}</h5>
                    <p className="text-xs text-slate-300 mt-0.5">{notif.message}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">{new Date(notif.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
