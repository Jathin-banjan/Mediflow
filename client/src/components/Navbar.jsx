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
  AlertTriangle
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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Product Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
              <Activity className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Medi<span className="text-teal-400">Flow</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-1">
                Patient Flow Intelligence
              </span>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/hospitals"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/hospitals')
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HospitalIcon className="w-4 h-4" />
              Hospitals
            </Link>

            <Link
              to="/doctors"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/doctors')
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Doctors
            </Link>

            <Link
              to="/planner"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/planner')
                  ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              Smart Visit Planner
            </Link>

            <Link
              to="/emergency"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/emergency')
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  : 'text-rose-400/90 hover:text-rose-200 hover:bg-rose-500/10'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </Link>
          </nav>

          {/* Right Action Icons & User State */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Role Specific Dashboard Button */}
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
                  className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-md shadow-teal-500/20 flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  {user.role === 'DOCTOR'
                    ? 'Doctor Queue'
                    : user.role === 'HOSPITAL_ADMIN'
                    ? 'Hospital Console'
                    : user.role === 'SUPER_ADMIN'
                    ? 'Super Admin'
                    : 'My Dashboard'}
                </Link>

                {/* User Dropdown Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center text-sm border border-teal-500/30">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm font-medium text-slate-200 pr-1 max-w-[120px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl glass-card border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-slate-700/60">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-teal-400" />
                        Appointments & Visits
                      </Link>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 mt-1 border-t border-slate-700/60"
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
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-md shadow-teal-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/hospitals"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-teal-400"
          >
            Find Hospitals
          </Link>
          <Link
            to="/doctors"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-teal-400"
          >
            Find Doctors
          </Link>
          <Link
            to="/planner"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-emerald-400 hover:text-emerald-300"
          >
            Smart Visit Planner
          </Link>
          <Link
            to="/emergency"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-rose-400 hover:text-rose-300"
          >
            Emergency Care
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
                className="block w-full text-center py-2.5 rounded-lg bg-teal-500 text-slate-950 font-bold"
              >
                Dashboard Console
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="block w-full text-center py-2.5 rounded-lg bg-slate-800 text-rose-400 font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center py-2 rounded-lg bg-slate-800 text-slate-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center py-2 rounded-lg bg-teal-500 text-slate-950 font-bold"
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
