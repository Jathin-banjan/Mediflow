import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorAPI } from '../services/api';
import { Search, Stethoscope, MapPin, Calendar, Clock, Star, Filter } from 'lucide-react';

export const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await doctorAPI.getDoctors({ search, specialty });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [search, specialty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest block">Doctor Marketplace</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Find Top Medical Specialists</h1>
        <p className="text-slate-400 text-sm">
          Book in-person or video consultations with verified doctors across top hospitals.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor name, specialty, or qualification..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-teal-500 outline-none"
          />
        </div>

        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 text-sm focus:border-teal-500 outline-none w-full md:w-auto"
        >
          <option value="">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Dermatology">Dermatology</option>
          <option value="General Medicine">General Medicine</option>
        </select>
      </div>

      {/* Doctor Cards Marketplace Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading doctors...</div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl border border-slate-800">
          <Stethoscope className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No doctors found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div key={doc._id} className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={doc.avatar || 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80'}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">{doc.name}</h3>
                    <span className="text-xs font-semibold text-teal-400 block">{doc.specialty}</span>
                    <span className="text-xs text-slate-400 block">{doc.qualification}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Hospital:</span>
                    <span className="font-semibold text-white truncate max-w-[180px]">{doc.hospital?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span className="font-semibold text-white">{doc.experienceYears} Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Languages:</span>
                    <span className="font-semibold text-slate-300">{doc.languages?.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Consultation Fee</span>
                  <span className="text-xl font-extrabold text-white">${doc.consultationFee}</span>
                </div>

                <Link
                  to={`/doctors/${doc._id}`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-md shadow-teal-500/20"
                >
                  View Profile & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
