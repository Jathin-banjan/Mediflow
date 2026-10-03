import React, { useState } from 'react';
import { Clock, TrendingDown, Sparkles, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export const SmartPlannerWidget = ({ departmentName = 'Cardiology OPD', forecast }) => {
  const defaultHourly = [
    { time: '09:00 AM', crowd: 'High', waitMinutes: 42, recommendation: 'Peak morning arrival' },
    { time: '10:00 AM', crowd: 'High', waitMinutes: 48, recommendation: 'Very busy period' },
    { time: '11:00 AM', crowd: 'High', waitMinutes: 38, recommendation: 'Moderate wait' },
    { time: '12:00 PM', crowd: 'Medium', waitMinutes: 24, recommendation: 'Good mid-day slot' },
    { time: '01:00 PM', crowd: 'Low', waitMinutes: 15, recommendation: 'Lunch shift - minimal crowd' },
    { time: '02:00 PM', crowd: 'Low', waitMinutes: 12, recommendation: 'Optimal visit time (Lowest wait)' },
    { time: '03:00 PM', crowd: 'Medium', waitMinutes: 22, recommendation: 'Moderate afternoon traffic' },
    { time: '04:00 PM', crowd: 'High', waitMinutes: 40, recommendation: 'Evening peak start' }
  ];

  const slots = forecast?.hourlySlots || defaultHourly;
  const optimalTime = forecast?.optimalTime || '02:00 PM';
  const insight = forecast?.historicalInsight || `Historically, ${departmentName} experiences 60% lower queue volume around 02:00 PM.`;

  return (
    <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Patient Flow Intelligence Engine
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1">
            Smart Visit Planner — "When Should I Go?"
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Predictive hourly crowd density for <span className="text-teal-300 font-semibold">{departmentName}</span>
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <TrendingDown className="w-4 h-4" />
          Recommended: {optimalTime}
        </div>
      </div>

      {/* Historical Insight Callout Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 flex items-start gap-3 mb-6">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-200 leading-relaxed">
          <strong className="text-emerald-300 block font-semibold mb-0.5">Historical Database Intelligence</strong>
          {insight}
        </div>
      </div>

      {/* Hourly Crowd Forecast Grid / Bars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {slots.map((slot, index) => {
          const isOptimal = slot.time === optimalTime || slot.crowd === 'Low';
          return (
            <div
              key={index}
              className={`p-3 rounded-xl border flex flex-col items-center justify-between text-center transition-all duration-300 ${
                isOptimal
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md shadow-emerald-500/10 scale-105'
                  : slot.crowd === 'High'
                  ? 'bg-rose-500/5 border-rose-500/20'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <span className="text-xs font-bold text-slate-200">{slot.time}</span>

              {/* Visual Density Meter Bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 my-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    slot.crowd === 'Low'
                      ? 'bg-emerald-400 w-1/3'
                      : slot.crowd === 'Medium'
                      ? 'bg-amber-400 w-2/3'
                      : 'bg-rose-500 w-full'
                  }`}
                ></div>
              </div>

              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  slot.crowd === 'Low'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : slot.crowd === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {slot.crowd}
              </span>

              <span className="text-xs font-extrabold text-white mt-1.5">{slot.waitMinutes}m wait</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
