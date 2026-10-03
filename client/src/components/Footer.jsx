import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Heart, PhoneCall, Clock, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">

          {/* Col 1: Identity */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Activity className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Medi<span className="text-teal-400">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Healthcare, without the waiting. Intelligent real-time patient flow management, queue tracking, and hospital discovery platform.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400/90 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              HIPAA & Socket.IO Security Verified
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Patient Flow Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/hospitals" className="hover:text-teal-400 transition-colors">Discover Hospitals</Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-teal-400 transition-colors">Find Doctors & Specialists</Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-teal-400 transition-colors">Smart Visit Planner</Link>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-teal-400 transition-colors text-rose-400 hover:text-rose-300">Emergency Care Contacts</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Role Access */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Platform Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-teal-400 transition-colors">Patient Portal Sign In</Link>
              </li>
              <li>
                <Link to="/login?role=DOCTOR" className="hover:text-teal-400 transition-colors">Doctor Queue Console</Link>
              </li>
              <li>
                <Link to="/login?role=HOSPITAL_ADMIN" className="hover:text-teal-400 transition-colors">Hospital Administration</Link>
              </li>
              <li>
                <Link to="/login?role=SUPER_ADMIN" className="hover:text-teal-400 transition-colors">Super Admin Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Hotline */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Emergency Hotlines</h4>
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider">
                <PhoneCall className="w-4 h-4 text-rose-400 animate-bounce" />
                24/7 National Emergency
              </div>
              <p className="text-2xl font-black text-white tracking-tight">+1-800-999-EMERGENCY</p>
              <p className="text-[11px] text-slate-400 leading-tight">
                For immediate life-threatening situations, dial 911 or visit your nearest ER directly.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MediFlow Healthcare Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Patient Charter</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
