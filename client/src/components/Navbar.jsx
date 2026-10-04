import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  Activity,
  Calendar,
  Clock,
  User as UserIcon,
  LogOut,
  Bell,
  Shield,
  Building2 as HospitalIcon,
  Stethoscope,
  Menu,
  X,
  Compass,
  AlertTriangle,
  MapPin
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-teal-500/20 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Product Brand Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-400 flex items-center justify-center shadow-xl shadow-teal-500/25 group-hover:scale-105 transition-all duration-300">
              <Activity className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Medi<span className="text-gradient">Flow</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <div className="flex items-center gap-1 text-[10px] text-teal-400/90 font-extrabold tracking-wider uppercase -mt-1">
                <MapPin className="w-2.5 h-2.5 text-teal-400" />
                Mangalore & Udupi Health Network
              </div>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
            <Link
              to="/hospitals"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/hospitals')
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <HospitalIcon className="w-4 h-4" />
              Hospitals
            </Link>

            <Link
              to="/doctors"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/doctors')
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Specialists
            </Link>

            <Link
              to="/planner"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/planner')
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/80'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              Smart Visit Planner
            </Link>

            <Link
              to="/emergency"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/emergency')
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Emergency 24/7
            </Link>
          </nav>

          {/* Right Action Icons & User State */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to={
                    user.role === 'DOCTOR'
                      ? '/doctor-dashboard'
                      : user.role === 'HOSPITAL_ADMIN'
                      ? '/hospital-dashboard'
                      : user.role === 'SUPER_ADMIN'
                      ? '/super-admin'
                      : '/dashboard'
                  }
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition-all duration-200 shadow-lg shadow-teal-500/25 flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  {user.role === 'DOCTOR'
                    ? 'OPD Queue Console'
                    : user.role === 'HOSPITAL_ADMIN'
                    ? 'Hospital Console'
                    : user.role === 'SUPER_ADMIN'
                    ? 'Super Admin'
                    : 'My Queue Dashboard'}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2.5 p-1.5 rounded-2xl border border-teal-500/30 bg-slate-900/80 hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 font-extrabold flex items-center justify-center text-xs shadow-md">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-bold text-slate-200 pr-1 max-w-[120px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-60 rounded-2xl glass-panel border border-teal-500/30 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-slate-800">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-teal-300 flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-teal-400" />
                        Visits & Tokens
                      </Link>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 mt-1 border-t border-slate-800"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition-all duration-200 shadow-lg shadow-teal-500/25"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-4 pb-6 space-y-3">
          <Link
            to="/hospitals"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-200 hover:text-teal-400"
          >
            Hospitals (Mangalore & Udupi)
          </Link>
          <Link
            to="/doctors"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-200 hover:text-teal-400"
          >
            Specialist Doctors
          </Link>
          <Link
            to="/planner"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-emerald-400 hover:text-emerald-300"
          >
            Smart Visit Planner
          </Link>
          <Link
            to="/emergency"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-rose-400 hover:text-rose-300"
          >
            Emergency 24/7 Care
          </Link>

          {user ? (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <Link
                to={
                  user.role === 'DOCTOR'
                    ? '/doctor-dashboard'
                    : user.role === 'HOSPITAL_ADMIN'
                    ? '/hospital-dashboard'
                    : user.role === 'SUPER_ADMIN'
                    ? '/super-admin'
                    : '/dashboard'
                }
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-xs shadow-md"
              >
                Dashboard Console
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="block w-full text-center py-3 rounded-xl bg-slate-900 text-rose-400 font-bold text-xs border border-slate-800"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-xl bg-slate-900 text-slate-200 font-bold text-xs border border-slate-800"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-xs shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
