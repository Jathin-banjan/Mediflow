import React, { useState, useEffect } from 'react';
import { hospitalAPI } from '../services/api';
import { AlertTriangle, PhoneCall, MapPin, Building2, ShieldCheck, ExternalLink } from 'lucide-react';

export const EmergencyPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmergency = async () => {
      try {
        setLoading(true);
        const res = await hospitalAPI.getHospitals({ emergency: 'true' });
        if (res.data.success) {
          setHospitals(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load emergency contacts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmergency();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Emergency Alert Banner */}
      <div className="p-6 rounded-3xl bg-rose-950/60 border border-rose-500/40 text-rose-200 space-y-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
            <AlertTriangle className="w-7 h-7 animate-bounce" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Emergency Information Center</h1>
            <p className="text-xs text-rose-300">24/7 Trauma, ICU, and Ambulance Contacts</p>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 text-xs text-slate-300 space-y-1">
          <strong className="text-rose-400 font-bold block uppercase tracking-wider">⚠️ Important Emergency Disclaimer</strong>
          MediFlow provides real-time information on hospital emergency department status and hotline contacts. This platform does NOT replace national emergency response services. For life-threatening emergencies, immediately dial <strong>911</strong> or visit the nearest ER.
        </div>
      </div>

      {/* National Hotline Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-card border border-rose-500/30 text-center space-y-2">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block">National Emergency</span>
          <span className="text-4xl font-black text-white block">911</span>
          <span className="text-xs text-slate-400">Immediate Ambulance & Rescue</span>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-teal-500/30 text-center space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block">MediFlow Dispatch</span>
          <span className="text-3xl font-black text-white block">+1-800-999-EMERGENCY</span>
          <span className="text-xs text-slate-400">24/7 Hospital Bed & Trauma Status</span>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-emerald-500/30 text-center space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Poison Helpline</span>
          <span className="text-3xl font-black text-white block">+1-800-222-1222</span>
          <span className="text-xs text-slate-400">Toxic Exposure Response</span>
        </div>
      </div>

      {/* Emergency Department Availability List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Verified Emergency Departments</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hospitals.map((h) => (
            <div key={h._id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{h.name}</h3>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ER Open 24/7
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> {h.address?.street}, {h.address?.city}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`tel:${h.emergencyPhone || h.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs shadow-lg shadow-rose-500/20 flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" /> Call ER Hotline: {h.emergencyPhone || h.phone}
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(h.name + ' ' + h.address?.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
                >
                  Directions <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
