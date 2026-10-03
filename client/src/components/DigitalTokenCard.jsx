import React from 'react';
import { Ticket, Clock, UserCheck, AlertCircle, Printer, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { CrowdIndicator } from './CrowdIndicator';

export const DigitalTokenCard = ({ appointment, onCheckIn, onCancel, onReschedule }) => {
  if (!appointment) return null;

  const isCheckedIn = ['WAITING', 'CALLED', 'IN-CONSULTATION', 'COMPLETED'].includes(appointment.status);

  return (
    <div className="glass-card rounded-2xl p-6 border border-teal-500/30 relative overflow-hidden shadow-2xl">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-teal-500/15 text-teal-300 border border-teal-500/30">
              {appointment.appointmentNumber || '#MF-20481'}
            </span>
            <span className="text-xs text-slate-400">• {appointment.consultationType || 'In-person'}</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            {appointment.doctor?.name || 'Dr. Specialist'}
          </h3>
          <p className="text-sm text-slate-400">
            {appointment.department?.name || 'Department'} • {appointment.hospital?.name || 'Hospital'}
          </p>
        </div>

        {/* Token Badge */}
        {isCheckedIn && appointment.tokenNumber ? (
          <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/40 rounded-2xl p-3.5 text-center min-w-[130px] shadow-lg shadow-teal-500/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 tracking-widest block">Digital Token</span>
            <span className="text-3xl font-extrabold text-white tracking-wider my-0.5 block">{appointment.tokenNumber}</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Queue Position
            </span>
          </div>
        ) : (
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-3.5 text-center min-w-[130px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Time Slot</span>
            <span className="text-lg font-bold text-white block mt-0.5">{appointment.timeSlot}</span>
            <span className="text-[11px] text-slate-400 block">{appointment.date}</span>
          </div>
        )}
      </div>

      {/* Queue Progress Bar & Information */}
      {isCheckedIn ? (
        <div className="my-6 bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-teal-300 font-semibold">
              <Activity className="w-4 h-4 text-teal-400 animate-pulse" />
              {appointment.status === 'CALLED'
                ? 'DOCTOR IS READY FOR YOU NOW!'
                : appointment.status === 'IN-CONSULTATION'
                ? 'Consultation in Progress'
                : appointment.status === 'COMPLETED'
                ? 'Consultation Completed'
                : `Patients ahead in queue: ${appointment.queuePosition ? appointment.queuePosition - 1 : 0}`}
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-200">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              Est. Wait: {appointment.estimatedWaitMinutes || 15} mins
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{
                width:
                  appointment.status === 'COMPLETED'
                    ? '100%'
                    : appointment.status === 'CALLED' || appointment.status === 'IN-CONSULTATION'
                    ? '90%'
                    : `${Math.max(10, 100 - (appointment.queuePosition || 1) * 10)}%`
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="my-5 p-4 rounded-xl bg-teal-950/30 border border-teal-500/20 text-xs text-teal-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Ready for your visit?</span>
            Click <strong className="text-white">"Check In & Join Live Queue"</strong> when you arrive at the hospital to receive your digital token and real-time wait time updates.
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {!isCheckedIn && appointment.status === 'BOOKED' && (
          <button
            onClick={() => onCheckIn(appointment._id)}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm transition-all duration-200 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Check In & Join Live Queue
          </button>
        )}

        {isCheckedIn && (
          <button
            onClick={() => window.print()}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 border border-slate-700"
          >
            <Printer className="w-4 h-4 text-teal-400" />
            Print Digital Token Pass
          </button>
        )}

        {appointment.status === 'BOOKED' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onReschedule && onReschedule(appointment)}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Reschedule
            </button>
            <button
              onClick={() => onCancel && onCancel(appointment._id)}
              className="py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/20"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
