import React, { useState, useEffect } from 'react';
import { SmartPlannerWidget } from '../components/SmartPlannerWidget';
import { hospitalAPI, departmentAPI } from '../services/api';
import { Compass, Sparkles, Building2, Calendar } from 'lucide-react';

export const SmartPlannerPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await hospitalAPI.getHospitals();
        if (res.data.success && res.data.data.length > 0) {
          setHospitals(res.data.data);
          setSelectedHospital(res.data.data[0]._id);
        }
      } catch (err) {
        console.error('Failed to load hospitals:', err);
      }
    };
    fetchHospitals();
  }, []);

  useEffect(() => {
    const fetchDepts = async () => {
      if (selectedHospital) {
        try {
          const res = await departmentAPI.getDepartments({ hospital: selectedHospital });
          if (res.data.success && res.data.data.length > 0) {
            setDepartments(res.data.data);
            setSelectedDepartment(res.data.data[0]._id);
          }
        } catch (err) {
          console.error('Failed to load departments:', err);
        }
      }
    };
    fetchDepts();
  }, [selectedHospital]);

  useEffect(() => {
    const fetchPlanner = async () => {
      if (selectedDepartment) {
        try {
          const res = await departmentAPI.getDepartmentPlanner(selectedDepartment, selectedDate);
          if (res.data.success) {
            setForecast(res.data.data);
          }
        } catch (err) {
          console.error('Failed to load planner forecast:', err);
        }
      }
    };
    fetchPlanner();
  }, [selectedDepartment, selectedDate]);

  const currentDeptObj = departments.find((d) => d._id === selectedDepartment);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          "When Should I Go?" Feature
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Smart Visit Planner</h1>
        <p className="text-slate-400 text-sm">
          Select a hospital, department, and date to view predicted hourly crowd surges and find the quietest visit hours.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Select Hospital</label>
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs focus:border-teal-500 outline-none"
          >
            {hospitals.map((h) => (
              <option key={h._id} value={h._id}>{h.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Select Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs focus:border-teal-500 outline-none"
          >
            {departments.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Target Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs focus:border-teal-500 outline-none"
          />
        </div>
      </div>

      {/* Smart Planner Graph Component */}
      <SmartPlannerWidget departmentName={currentDeptObj?.name || 'Cardiology OPD'} forecast={forecast} />
    </div>
  );
};
