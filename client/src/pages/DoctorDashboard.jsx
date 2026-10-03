import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useSocket } from '../context/SocketContext';
import { queueAPI, appointmentAPI, doctorAPI } from '../services/api';
import {
  Users,
  Play,
  CheckCircle2,
  SkipForward,
  Pause,
  Volume2,
  Clock,
  Activity,
  UserCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const { socket } = useSocket();

  const [queue, setQueue] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      // Get active queue
      const qRes = await queueAPI.getQueues();
      if (qRes.data.success && qRes.data.data.length > 0) {
        setQueue(qRes.data.data[0]);
      }

      // Get appointments
      const aRes = await appointmentAPI.getAppointments();
      if (aRes.data.success) {
        setAppointments(aRes.data.data);
      }
    } catch (err) {
      console.error('Error fetching doctor dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  // Listen for socket events
  useEffect(() => {
    if (socket) {
      const handleUpdate = () => fetchDoctorData();
      socket.on('queue_updated', handleUpdate);
      return () => socket.off('queue_updated', handleUpdate);
    }
  }, [socket]);

  const handleQueueAction = async (action, entryId = null) => {
    if (!queue) return;
    try {
      const res = await queueAPI.handleAction(queue._id, { action, entryId });
      if (res.data.success) {
        addToast(res.data.message, 'success');
        fetchDoctorData();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Queue action failed.', 'error');
    }
  };

  const currentServingEntry = queue?.entries?.find(
    (e) => e.status === 'CALLED' || e.status === 'IN-CONSULTATION'
  );
  const waitingEntries = queue?.entries?.filter((e) => e.status === 'WAITING') || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block">Doctor Queue Console</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Console: {user?.name}</h1>
          <p className="text-xs text-slate-400 mt-1">Live OPD Queue Console with Real-time Socket Patient Calling Engine</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQueueAction('TOGGLE_PAUSE')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${
              queue?.status === 'PAUSED'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            <Pause className="w-4 h-4" />
            Queue Status: {queue?.status || 'ACTIVE'}
          </button>
        </div>
      </div>

      {/* Main Queue Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Col: Primary Patient Calling & Action Suite (Col-8) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Current Serving Active Patient Card */}
          <div className="glass-card rounded-3xl p-6 border border-teal-500/40 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <span className="text-xs font-extrabold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400 animate-pulse" />
                Currently In Consultation Room
              </span>
              <span className="text-xs font-semibold text-slate-400">Queue: {queue?.name}</span>
            </div>

            {currentServingEntry ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-3xl font-black text-white">{currentServingEntry.patient?.name}</span>
                    <p className="text-xs text-slate-400 mt-1">Reason: {currentServingEntry.appointment?.reason || 'General Consultation'}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        Token: {currentServingEntry.tokenNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                        Status: {currentServingEntry.status}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 p-4 rounded-xl text-center border border-teal-500/30">
                    <span className="text-[10px] font-bold text-teal-300 uppercase block">Active Token</span>
                    <span className="text-4xl font-extrabold text-white tracking-widest">{currentServingEntry.tokenNumber}</span>
                  </div>
                </div>

                {/* Consultation Controls */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleQueueAction('START', currentServingEntry._id)}
                    className="py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <Play className="w-4 h-4" /> Start Consultation
                  </button>

                  <button
                    onClick={() => handleQueueAction('COMPLETE', currentServingEntry._id)}
                    className="py-3 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-teal-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Complete Consultation
                  </button>

                  <button
                    onClick={() => handleQueueAction('SKIP', currentServingEntry._id)}
                    className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <SkipForward className="w-4 h-4 text-amber-400" /> Skip Patient
                  </button>

                  <button
                    onClick={() => handleQueueAction('NO_SHOW', currentServingEntry._id)}
                    className="py-3 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-500/30"
                  >
                    <AlertCircle className="w-4 h-4" /> No Show
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-4">
                <Users className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">No patient currently inside consultation room.</p>
                <button
                  onClick={() => handleQueueAction('CALL_NEXT')}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/20 inline-flex items-center gap-2"
                >
                  <Volume2 className="w-5 h-5" />
                  CALL NEXT PATIENT IN QUEUE
                </button>
              </div>
            )}
          </div>

          {/* Call Next Button Bar */}
          {currentServingEntry && (
            <button
              onClick={() => handleQueueAction('CALL_NEXT')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-base shadow-xl shadow-teal-500/20 flex items-center justify-center gap-3"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
              CALL NEXT PATIENT ({waitingEntries.length} Patients Waiting Ahead)
            </button>
          )}

          {/* Waiting Patients Queue List */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>Waiting Patients ({waitingEntries.length})</span>
              <span className="text-xs text-slate-400 font-normal">Sorted by arrival position</span>
            </h3>

            <div className="space-y-3">
              {waitingEntries.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">No waiting patients in line.</div>
              ) : (
                waitingEntries.map((entry, idx) => (
                  <div key={entry._id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-300 font-black text-xs flex items-center justify-center border border-teal-500/30">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{entry.patient?.name}</h4>
                        <span className="text-xs text-slate-400">Token: <strong className="text-teal-300">{entry.tokenNumber}</strong> • Est wait: {entry.estimatedWaitMinutes}m</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQueueAction('START', entry._id)}
                      className="px-3.5 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-bold border border-teal-500/30"
                    >
                      Call Room
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Col: Today's Full Schedule (Col-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" />
              Today's Schedule ({appointments.length})
            </h3>

            <div className="space-y-3">
              {appointments.map((appt) => (
                <div key={appt._id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{appt.patient?.name}</span>
                    <span className="text-slate-400 font-semibold">{appt.timeSlot}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{appt.appointmentNumber}</span>
                    <span className="text-teal-400 font-bold">{appt.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
