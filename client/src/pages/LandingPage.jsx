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
  Award
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
        console.error('Error loading landing page preview data:', err);
      }
    };
    fetchData();
  }, []);

  const faqs = [
    {
      q: 'How does MediFlow calculate estimated waiting time?',
      a: 'MediFlow calculates estimated wait time by combining live active token counts ahead of you, average consultation durations per doctor, and historical department surge data.'
    },
    {
      q: 'Do I need to stand in physical hospital lines to get a queue token?',
      a: 'No! With MediFlow digital check-in, you can obtain your queue token directly on your phone, track live room status, and arrive right when it is your turn.'
    },
    {
      q: 'What is the "When Should I Go?" Smart Visit Planner?',
      a: 'The Smart Visit Planner analyzes historical hospital crowd density patterns to recommend the optimal quiet hours with the lowest expected wait time.'
    },
    {
      q: 'Can hospitals update emergency and bed availability in real-time?',
      a: 'Yes. Hospital administrators have direct access to update real-time crowd levels, emergency availability, and department operational status.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">

      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-teal-400" />
                Live Patient Flow Intelligence Engine
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Healthcare, <br />
                <span className="text-gradient">without the waiting.</span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover top hospitals, book specialist appointments, track live queue positions in real-time, and know exact estimated wait times before stepping out.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/doctors"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-base transition-all duration-200 shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2"
                >
                  <Stethoscope className="w-5 h-5" />
                  Find a Doctor
                </Link>

                <Link
                  to="/hospitals"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-slate-800 text-white font-bold text-base transition-all duration-200 border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Building2 className="w-5 h-5 text-teal-400" />
                  Explore Hospitals
                </Link>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0">
                <div>
                  <span className="text-2xl font-black text-white block">50+</span>
                  <span className="text-xs text-slate-400 font-medium">Hospitals & Clinics</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-400 block">&lt; 14 min</span>
                  <span className="text-xs text-slate-400 font-medium">Avg Queue Time Saved</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-teal-400 block">99.8%</span>
                  <span className="text-xs text-slate-400 font-medium">Wait Time Accuracy</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Preview Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-3xl p-6 border border-teal-500/30 shadow-2xl relative"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                    <div>
                      <h4 className="text-sm font-bold text-white">City Care Hospital</h4>
                      <p className="text-xs text-slate-400">Cardiology OPD Queue</p>
                    </div>
                  </div>
                  <CrowdIndicator level="Medium" estimatedWait={28} showWait={false} />
                </div>

                {/* Live Active Token Teaser */}
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Current Serving Token</span>
                    <span className="text-teal-400 font-bold">A-19</span>
                  </div>

                  <div className="flex items-center justify-between bg-teal-500/10 border border-teal-500/30 p-3 rounded-xl">
                    <div>
                      <span className="text-[10px] uppercase text-teal-300 font-bold block">Your Digital Token</span>
                      <span className="text-2xl font-black text-white tracking-wider">A-27</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-emerald-400 font-bold block">7 Patients Ahead</span>
                      <span className="text-xs text-slate-300">~28 min wait</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full w-[65%] rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/40 p-3 rounded-xl">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-4 h-4 text-teal-400" />
                    Doctor: Dr. Ananya Rao
                  </span>
                  <span className="text-emerald-400 font-semibold">Active Consultation</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* How MediFlow Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Streamlined Patient Experience</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">How MediFlow Works</p>
          <p className="text-slate-400 text-base">Four simple steps to eliminate hospital waiting room anxiety.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Find Hospital & Doctor', desc: 'Browse verified super specialty hospitals, departments, and top specialists by location and crowd levels.', icon: Search },
            { step: '02', title: 'Book Time Slot', desc: 'Select preferred date and time slot with conflict-free instant confirmation.', icon: Calendar },
            { step: '03', title: 'Check In Digitally', desc: 'Receive your unique digital token (e.g. A-27) upon arrival or remote check-in.', icon: Clock },
            { step: '04', title: 'Track Live Queue', desc: 'Watch real-time token progress and get notified right when doctor is ready.', icon: Activity }
          ].map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 relative group">
              <span className="text-4xl font-black text-slate-800 group-hover:text-teal-500/20 transition-colors absolute top-4 right-4">{item.step}</span>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 mb-5">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Visit Planner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartPlannerWidget />
      </section>

      {/* Featured Hospitals Discovery Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-teal-400 mb-1">Premier Network</h2>
            <h3 className="text-3xl font-extrabold text-white">Verified Hospitals & Clinics</h3>
          </div>
          <Link to="/hospitals" className="text-sm font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5">
            View All Hospitals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hospitals.map((h) => (
            <div key={h._id} className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <img src={h.images?.[0] || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'} alt={h.name} className="w-full h-48 object-cover" />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" /> {h.address?.city}, {h.address?.state}
                    </span>
                    <CrowdIndicator level={h.currentCrowdLevel} estimatedWait={h.estimatedWaitMinutes} />
                  </div>
                  <h4 className="text-xl font-bold text-white">{h.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{h.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-teal-300">Rating: ⭐ {h.rating}</span>
                <Link to={`/hospitals/${h._id}`} className="px-4 py-2 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                  View Profile & Queue
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 lg:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Startup-Grade Security & Privacy</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              MediFlow is engineered with strict JWT authentication, role-based route guards, and Socket.IO encrypted queue broadcasts.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Conflict-Free Slot Engine</h4>
              <p className="text-xs text-slate-400">Atomic appointment locking prevents duplicate slot bookings.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <h4 className="text-sm font-bold text-white">Real-Time Socket Sync</h4>
              <p className="text-xs text-slate-400">Instant queue position updates without page refreshes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-teal-400">Frequently Asked Questions</h2>
          <h3 className="text-3xl font-extrabold text-white">Everything You Need To Know</h3>
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

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 p-8 sm:p-12 text-center text-slate-950 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Experience Healthcare Without Waiting.
          </h2>
          <p className="text-slate-950/80 font-medium text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Join thousands of patients discovering hospitals, booking specialist appointments, and tracking live queues with MediFlow.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-950 text-white font-extrabold text-base hover:bg-slate-900 transition-all duration-200 shadow-xl"
          >
            Create Your MediFlow Account
            <ArrowRight className="w-5 h-5 text-teal-400" />
          </Link>
        </div>
      </section>

    </div>
  );
};
