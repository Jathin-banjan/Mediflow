import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Activity, Lock, Mail, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      addToast(`Welcome back, ${user.name}!`, 'success');

      if (user.role === 'DOCTOR') navigate('/doctor-dashboard');
      else if (user.role === 'HOSPITAL_ADMIN') navigate('/hospital-dashboard');
      else if (user.role === 'SUPER_ADMIN') navigate('/super-admin');
      else navigate('/dashboard');
    } catch (err) {
      addToast(err.response?.data?.message || 'Login failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoEmail, roleName) => {
    setEmail(demoEmail);
    setPassword('Password123!');
    addToast(`Filled demo credentials for ${roleName}`, 'info');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-slate-800 shadow-2xl relative">
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
            <Activity className="w-7 h-7 text-slate-950 font-bold" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Sign In to MediFlow</h2>
          <p className="text-xs text-slate-400">Access your live patient flow dashboard and appointments</p>
        </div>

        {/* Quick Demo Credentials Bar */}
        <div className="mb-6 p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-xs space-y-2">
          <span className="font-bold text-teal-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Quick Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={() => fillDemoAccount('patient@mediflow.com', 'Patient')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[11px] font-semibold border border-slate-700/60 transition-colors text-left truncate"
            >
              👤 Patient
            </button>
            <button
              onClick={() => fillDemoAccount('doctor.ananya@mediflow.com', 'Doctor')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-teal-300 text-[11px] font-semibold border border-teal-500/30 transition-colors text-left truncate"
            >
              👨‍⚕️ Doctor Queue
            </button>
            <button
              onClick={() => fillDemoAccount('admin.citycare@mediflow.com', 'Hospital Admin')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30 transition-colors text-left truncate"
            >
              🏥 Hospital Admin
            </button>
            <button
              onClick={() => fillDemoAccount('superadmin@mediflow.com', 'Super Admin')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-purple-300 text-[11px] font-semibold border border-purple-500/30 transition-colors text-left truncate"
            >
              ⚡ Super Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm transition-all duration-200 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 mt-6"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-400 font-bold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};
