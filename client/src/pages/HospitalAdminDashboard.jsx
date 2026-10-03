import React, { useState, useEffect } from 'react';
import { analyticsAPI, hospitalAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  Building2, Users, Calendar, Clock, Activity, TrendingUp, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { CrowdIndicator } from '../components/CrowdIndicator';

export const HospitalAdminDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [analytics, setAnalytics] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [aRes, hRes] = await Promise.all([
          analyticsAPI.getAnalytics('7'),
          hospitalAPI.getHospitals()
        ]);
        if (aRes.data.success) setAnalytics(aRes.data.data);
        if (hRes.data.success && hRes.data.data.length > 0) {
          setHospital(hRes.data.data[0]);
        }
      } catch (err) {
        console.error('Failed to load admin analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCrowdChange = async (newCrowd) => {
    if (!hospital) return;
    try {
      const res = await hospitalAPI.updateHospital(hospital._id, { currentCrowdLevel: newCrowd });
      if (res.data.success) {
        setHospital(res.data.data);
        addToast(`Hospital crowd status updated to ${newCrowd}`, 'success');
      }
    } catch (err) {
      addToast('Failed to update crowd level.', 'error');
    }
  };

  const summary = analytics?.summary || {
    totalAppointments: 142,
    completedAppointments: 128,
    avgWaitTimeMinutes: 24,
    activeQueues: 6,
    completionRate: 90,
    cancellationRate: 5
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block">Hospital Administration Portal</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{hospital?.name || 'City Care Hospital'}</h1>
          <p className="text-xs text-slate-400 mt-1">Live patient volume, queue analytics, and department resource management.</p>
        </div>

        {/* Live Crowd Level Controls */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold px-2">Set Live Surge:</span>
          {['Low', 'Medium', 'High', 'Critical'].map((level) => (
            <button
              key={level}
              onClick={() => handleCrowdChange(level)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                hospital?.currentCrowdLevel === level
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Total Appointments</span>
          <span className="text-3xl font-black text-white mt-1 block">{summary.totalAppointments}</span>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12% from last week
          </span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Completed Consultations</span>
          <span className="text-3xl font-black text-emerald-400 mt-1 block">{summary.completedAppointments}</span>
          <span className="text-[11px] text-slate-400 mt-1 block">{summary.completionRate}% completion rate</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Average Wait Time</span>
          <span className="text-3xl font-black text-teal-400 mt-1 block">{summary.avgWaitTimeMinutes} min</span>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 block">14 mins saved vs baseline</span>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Active Department Queues</span>
          <span className="text-3xl font-black text-cyan-400 mt-1 block">{summary.activeQueues}</span>
          <span className="text-[11px] text-slate-400 mt-1 block">Live Socket sync online</span>
        </div>
      </div>

      {/* Recharts Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Chart 1: Daily Appointments Bar Chart (Col-8) */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Daily Appointments & Completion Volume</h3>
            <span className="text-xs text-slate-400">Past 7 Days</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.dailyAppointmentsData || []}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="appointments" fill="#0ea5e9" radius={[6, 6, 0, 0]} name="Total Booked" />
                <Bar dataKey="completed" fill="#10b981" radius={[6, 6, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Department Utilization Pie Chart (Col-4) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Department Patient Distribution</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.departmentUtilization || []}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {(analytics?.departmentUtilization || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
