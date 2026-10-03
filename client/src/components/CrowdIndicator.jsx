import React from 'react';
import { Users, AlertCircle, CheckCircle2, Flame } from 'lucide-react';

export const CrowdIndicator = ({ level = 'Medium', estimatedWait = 25, showWait = true }) => {
  const config = {
    Low: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      dot: 'bg-emerald-400',
      label: 'Low Crowd',
      icon: CheckCircle2
    },
    Medium: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      dot: 'bg-amber-400',
      label: 'Moderate Crowd',
      icon: Users
    },
    High: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      dot: 'bg-rose-400',
      label: 'High Surge',
      icon: Flame
    },
    Critical: {
      bg: 'bg-red-600/20',
      border: 'border-red-500/50',
      text: 'text-red-300',
      dot: 'bg-red-500',
      label: 'Critical Peak',
      icon: AlertCircle
    }
  };

  const style = config[level] || config.Medium;
  const Icon = style.icon;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${style.bg} ${style.border} ${style.text}`}>
        <span className={`w-2 h-2 rounded-full ${style.dot} animate-ping`}></span>
        <Icon className="w-3.5 h-3.5" />
        {style.label}
      </div>

      {showWait && (
        <span className="text-xs text-slate-300 font-medium bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-full">
          ~{estimatedWait} min wait
        </span>
      )}
    </div>
  );
};
