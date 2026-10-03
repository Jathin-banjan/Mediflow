import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center">
        <Activity className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-white">404 — Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md">
        The requested patient flow resource or page could not be located.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/20 inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
};
