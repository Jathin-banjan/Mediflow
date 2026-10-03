import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, Activity, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800 px-4 py-2 flex items-center justify-around">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          isActive('/') ? 'text-teal-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Home className="w-5 h-5" />
        Home
      </Link>

      <Link
        to="/hospitals"
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          isActive('/hospitals') || isActive('/doctors') ? 'text-teal-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Search className="w-5 h-5" />
        Discover
      </Link>

      <Link
        to="/planner"
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          isActive('/planner') ? 'text-emerald-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Activity className="w-5 h-5 text-emerald-400" />
        Smart Planner
      </Link>

      <Link
        to={user ? '/dashboard' : '/login'}
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          isActive('/dashboard') ? 'text-teal-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Calendar className="w-5 h-5" />
        Queue & Visits
      </Link>

      <Link
        to={user ? '/dashboard' : '/login'}
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          isActive('/login') ? 'text-teal-400 font-bold' : 'text-slate-400'
        }`}
      >
        <User className="w-5 h-5" />
        {user ? 'Account' : 'Login'}
      </Link>
    </div>
  );
};
