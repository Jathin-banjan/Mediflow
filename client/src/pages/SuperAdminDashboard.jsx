import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { ShieldCheck, Building2, Users, Stethoscope, CheckCircle2, XCircle } from 'lucide-react';

export const SuperAdminDashboard = () => {
  const { addToast } = useNotification();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getSystemOverview();
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load super admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleToggleVerify = async (hospitalId) => {
    try {
      const res = await adminAPI.toggleVerification(hospitalId);
      if (res.data.success) {
        addToast(res.data.message, 'success');
        fetchOverview();
      }
    } catch (err) {
      addToast('Failed to toggle verification.', 'error');
    }
  };

  const counts = data?.counts || { totalUsers: 18, patients: 12, doctors: 5, admins: 2, hospitals: 5 };
  const hospitals = data?.hospitalList || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block">Super Admin Command Center</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform System Administration</h1>
          <p className="text-xs text-slate-400 mt-1">Manage global platform verification, users, and hospital instances.</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center border border-purple-500/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Total System Users</span>
          <span className="text-3xl font-black text-white mt-1 block">{counts.totalUsers}</span>
        </div>
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Total Hospitals</span>
          <span className="text-3xl font-black text-teal-400 mt-1 block">{counts.hospitals}</span>
        </div>
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Active Doctors</span>
          <span className="text-3xl font-black text-emerald-400 mt-1 block">{counts.doctors}</span>
        </div>
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Registered Patients</span>
          <span className="text-3xl font-black text-purple-400 mt-1 block">{counts.patients}</span>
        </div>
      </div>

      {/* Hospital Verification Management Table */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-4">Hospital Network Verification</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Hospital Name</th>
                <th className="p-3">City & Location</th>
                <th className="p-3">Contact Email</th>
                <th className="p-3">Live Surge</th>
                <th className="p-3">Verification</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {hospitals.map((h) => (
                <tr key={h._id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-white">{h.name}</td>
                  <td className="p-3 text-slate-400">{h.address?.city}</td>
                  <td className="p-3 text-slate-400">{h.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300">
                      {h.currentCrowdLevel}
                    </span>
                  </td>
                  <td className="p-3">
                    {h.isVerified ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 flex items-center gap-1 w-fit">
                        <XCircle className="w-3 h-3" /> Unverified
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleToggleVerify(h._id)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-[11px] border border-slate-700"
                    >
                      {h.isVerified ? 'Unverify' : 'Verify Hospital'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
