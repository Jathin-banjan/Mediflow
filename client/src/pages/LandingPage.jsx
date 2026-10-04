import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  Clock,
  Search,
  Calendar,
  ShieldCheck,
  Users,
  Building2,
  Stethoscope,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  MapPin,
  ChevronDown,
  ChevronUp,
  Flame,
  Award,
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Sparkle
} from 'lucide-react';
import { CrowdIndicator } from '../components/CrowdIndicator';
import { SmartPlannerWidget } from '../components/SmartPlannerWidget';
import { hospitalAPI, doctorAPI } from '../services/api';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hRes, dRes] = await Promise.all([
          hospitalAPI.getHospitals({ limit: 3 }),
          doctorAPI.getDoctors({ limit: 3 })
        ]);
        if (hRes.data.success) setHospitals(hRes.data.data.slice(0, 3));
        if (dRes.data.success) setDoctors(dRes.data.data.slice(0, 3));
      } catch (err) {
        console.error('Error loading landing preview:', err);
      }
    };
    fetchData();
  }, []);

  const specialties = [
    { name: 'Cardiology', icon: HeartPulse, count: '14+ Specialists', desc: 'Heart surgery, ECG & Angioplasty' },
    { name: 'Neurology', icon: Brain, count: '10+ Specialists', desc: 'Neurosurgery & Stroke care' },
    { name: 'Orthopedics', icon: Bone, count: '18+ Specialists', desc: 'Joint replacement & Trauma care' },
    { name: 'Pediatrics', icon: Baby, count: '12+ Specialists', desc: 'Child health & NICU care' }
  ];

  const faqs = [
    {
      q: 'Which hospitals are covered in Mangalore & Udupi?',
      a: 'MediFlow covers major real super specialty hospitals including KMC Hospital (Jyothi), Kasturba Hospital (Manipal), AJ Hospital (Kuntikana), Father Muller Hospital (Kankanady), Indiana Hospital (Pumpwell), Yenepoya Specialty, Unity Health, TMA Pai (Udupi), Adarsha Hospital (Udupi), and 16+ other regional medical centers.'
    },
    {
      q: 'How does MediFlow calculate estimated wait time?',
      a: 'MediFlow combines real-time patient token numbers ahead of you, average doctor consultation durations, and historical OPD department surge data.'
    },
    {
      q: 'Do I need to stand in physical lines to get a digital queue token?',
      a: 'No! You can issue your queue token directly on your phone upon arrival or remote check-in, monitor live doctor consultation progress, and enter right when called.'
    },
    {
      q: 'What is the "When Should I Go?" Smart Visit Planner?',
      a: 'The Smart Visit Planner analyzes historical hospital crowd density to highlight optimal quiet hours (e.g. 2 PM low crowd) for minimal waiting time.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">

      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-teal-500/15 via-emerald-500/10 to-cyan-500/15 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-teal-500/30 text-teal-300 text-xs font-extrabold uppercase tracking-wider shadow-lg">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Mangalore & Udupi Regional Healthcare Network
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Healthcare, <br />
                <span className="text-gradient">without the waiting.</span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover top super specialty hospitals across Mangalore, Manipal & Udupi. Book specialist consultations, track real-time queue tokens, and know exact estimated wait times before stepping out.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/doctors"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-base transition-all duration-200 shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2"
                >
                  <Stethoscope className="w-5 h-5" />
                  Find Regional Specialists
                </Link>

                <Link
                  to="/hospitals"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-slate-800 text-white font-bold text-base transition-all duration-200 border border-teal-500/30 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Building2 className="w-5 h-5 text-teal-400" />
                  Explore 25+ Hospitals
                </Link>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
                <div>
                  <span className="text-2xl font-black text-white block">25+</span>
                  <span className="text-xs text-slate-400 font-semibold">Real Regional Hospitals</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-400 block">25+</span>
                  <span className="text-xs text-slate-400 font-semibold">Senior Specialists</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-teal-400 block">&lt; 12 min</span>
                  <span className="text-xs text-slate-400 font-semibold">Avg Wait Saved</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Preview Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-3xl p-6 border border-teal-500/40 shadow-2xl relative"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                    <div>
                      <h4 className="text-sm font-bold text-white">KMC Hospital (Jyothi)</h4>
                      <p className="text-xs text-slate-400">Cardiology OPD Queue • Mangalore</p>
                    </div>
                  </div>
                  <CrowdIndicator level="Medium" estimatedWait={22} showWait={false} />
                </div>

                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Doctor: Dr. Padmanabh Kamath</span>
                    <span className="text-teal-400 font-bold">Serving: A-19</span>
                  </div>

                  <div className="flex items-center justify-between bg-teal-500/10 border border-teal-500/30 p-3.5 rounded-xl">
                    <div>
                      <span className="text-[10px] uppercase text-teal-300 font-bold block">Your Digital Token</span>
                      <span className="text-3xl font-black text-white tracking-wider">A-27</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-emerald-400 font-bold block">7 Patients Ahead</span>
                      <span className="text-xs text-slate-300">~22 min wait</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full w-[70%] rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                  <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                    <Clock className="w-4 h-4 text-teal-400" />
                    Status: Doctor Active in Cabin
                  </span>
                  <span className="text-emerald-400 font-bold">Live Socket Sync</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Specialties Network Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Regional Expertise</span>
          <h2 className="text-3xl font-extrabold text-white">Super Specialty Medical Centers</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">{item.name}</h3>
              <span className="text-xs text-emerald-400 font-semibold block">{item.count}</span>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Visit Planner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartPlannerWidget departmentName="KMC Cardiology OPD (Mangalore)" />
      </section>

      {/* Featured Real Hospitals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400 block mb-1">Dakshina Kannada & Udupi</span>
            <h2 className="text-3xl font-extrabold text-white">Top Hospitals in Mangalore & Udupi</h2>
          </div>
          <Link to="/hospitals" className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5">
            View All 25 Hospitals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hospitals.map((h) => (
            <div key={h._id} className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="relative">
                  <img src={h.images?.[0] || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'} alt={h.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <CrowdIndicator level={h.currentCrowdLevel} estimatedWait={h.estimatedWaitMinutes} />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" /> {h.address?.street}, {h.address?.city}
                    </span>
                    <span className="font-bold text-teal-300">⭐ {h.rating} ({h.reviewsCount})</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">{h.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{h.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-teal-300">{h.phone}</span>
                <Link to={`/hospitals/${h._id}`} className="px-4 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                  View Profile & Queue
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Frequently Asked Questions</span>
          <h2 className="text-3xl font-extrabold text-white">Mangalore & Udupi Healthcare Answers</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-white font-bold text-base hover:text-teal-300 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-teal-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 p-8 sm:p-12 text-center text-slate-950 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Experience Healthcare Without Waiting.
          </h2>
          <p className="text-slate-950/80 font-semibold text-base max-w-2xl mx-auto mb-8">
            Access 25+ real hospitals across Mangalore, Manipal & Udupi. Book specialist appointments and track live OPD queues with MediFlow.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-950 text-white font-black text-sm hover:bg-slate-900 transition-all duration-200 shadow-2xl"
          >
            Create Your Account Now
            <ArrowRight className="w-5 h-5 text-teal-400" />
          </Link>
        </div>
      </section>

    </div>
  );
};
