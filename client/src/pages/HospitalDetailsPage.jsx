import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hospitalAPI, reviewAPI } from '../services/api';
import { CrowdIndicator } from '../components/CrowdIndicator';
import { SmartPlannerWidget } from '../components/SmartPlannerWidget';
import {
  MapPin, PhoneCall, Clock, Building2, Stethoscope, ShieldCheck,
  Activity, Star, CheckCircle2, ChevronRight, AlertTriangle
} from 'lucide-react';

export const HospitalDetailsPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'flow', 'doctors', 'departments', 'facilities', 'reviews'

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [hRes, rRes] = await Promise.all([
          hospitalAPI.getHospitalById(id),
          reviewAPI.getReviews({ hospital: id })
        ]);
        if (hRes.data.success) setHospital(hRes.data.data);
        if (rRes.data.success) setReviews(rRes.data.data);
      } catch (err) {
        console.error('Failed to load hospital details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-slate-400">Loading hospital details...</div>;
  if (!hospital) return <div className="text-center py-20 text-slate-400">Hospital not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Hospital Hero Banner */}
      <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
        <div className="h-64 sm:h-80 relative">
          <img
            src={hospital.images?.[0] || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80'}
            alt={hospital.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CrowdIndicator level={hospital.currentCrowdLevel} estimatedWait={hospital.estimatedWaitMinutes} />
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Medical Center
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{hospital.name}</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" /> {hospital.address?.street}, {hospital.address?.city}, {hospital.address?.state}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${hospital.phone}`}
                className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-teal-400" /> Call Hospital
              </a>
              <Link
                to={`/book-appointment?hospital=${hospital._id}`}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-teal-500/20"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="glass-card rounded-2xl p-2 border border-slate-800 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'flow', label: 'Live Patient Flow' },
          { id: 'doctors', label: `Doctors (${hospital.doctors?.length || 0})` },
          { id: 'departments', label: `Departments (${hospital.departments?.length || 0})` },
          { id: 'facilities', label: `Facilities (${hospital.facilities?.length || 0})` },
          { id: 'reviews', label: `Reviews (${reviews.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">About {hospital.name}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{hospital.description}</p>
            </div>

            {/* Smart Visit Planner Teaser */}
            <SmartPlannerWidget departmentName="Cardiology & General Medicine" />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">Operating Hours</h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Outpatient OPD:</span>
                  <span className="font-semibold text-white">{hospital.operatingHours}</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Care:</span>
                  <span className="font-semibold text-emerald-400">24 Hours / 7 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Hotline:</span>
                  <span className="font-bold text-rose-400">{hospital.emergencyPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Live Patient Flow */}
      {activeTab === 'flow' && (
        <div className="glass-card rounded-3xl p-6 border border-teal-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block">Live Flow Intelligence</span>
              <h3 className="text-2xl font-extrabold text-white">Department Queue Surge Levels</h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              ● Socket Live Sync Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { dept: 'OPD General Consultation', patients: 24, wait: 32, status: 'Moderate', color: 'border-amber-500/40 text-amber-400' },
              { dept: 'Emergency & Trauma', patients: 6, wait: 5, status: 'Active Surge', color: 'border-emerald-500/40 text-emerald-400' },
              { dept: 'Diagnostics & MRI', patients: 8, wait: 15, status: 'Normal', color: 'border-teal-500/40 text-teal-400' },
              { dept: 'In-House Pharmacy', patients: 11, wait: 12, status: 'Moderate', color: 'border-cyan-500/40 text-cyan-400' }
            ].map((item, idx) => (
              <div key={idx} className={`p-5 rounded-2xl bg-slate-900/80 border ${item.color} space-y-3`}>
                <h4 className="text-sm font-bold text-white">{item.dept}</h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current Patients:</span>
                  <span className="font-bold text-white text-base">{item.patients}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Est. Wait Time:</span>
                  <span className="font-bold text-teal-300 text-base">~{item.wait} mins</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold uppercase tracking-wider">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Doctors */}
      {activeTab === 'doctors' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hospital.doctors?.map((doc) => (
            <div key={doc._id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-4">
                <img src={doc.avatar || 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80'} alt={doc.name} className="w-14 h-14 rounded-2xl object-cover" />
                <div>
                  <h4 className="text-base font-bold text-white">{doc.name}</h4>
                  <span className="text-xs text-teal-400 font-semibold block">{doc.specialty}</span>
                  <span className="text-[11px] text-slate-400">{doc.experienceYears} yrs experience • ⭐ {doc.rating}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-white">${doc.consultationFee} fee</span>
                <Link
                  to={`/doctors/${doc._id}`}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30"
                >
                  View Profile & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 4: Facilities */}
      {activeTab === 'facilities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hospital.facilities?.map((f) => (
            <div key={f._id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{f.name}</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">{f.status}</span>
              </div>
              <p className="text-xs text-slate-400">{f.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 5: Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">No reviews submitted yet.</div>
          ) : (
            reviews.map((r) => (
              <div key={r._id} className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{r.patient?.name || 'Verified Patient'}</span>
                  <span className="text-xs text-amber-400 font-bold">⭐ {r.overallRating} / 5</span>
                </div>
                <p className="text-xs text-slate-300">{r.comment}</p>
                <span className="text-[10px] text-slate-500 block">{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
