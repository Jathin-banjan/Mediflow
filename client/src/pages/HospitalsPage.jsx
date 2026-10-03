import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hospitalAPI } from '../services/api';
import { CrowdIndicator } from '../components/CrowdIndicator';
import { Search, MapPin, Building2, PhoneCall, ShieldCheck, Flame, Filter } from 'lucide-react';

export const HospitalsPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState('');
  const [crowdFilter, setCrowdFilter] = useState('');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const res = await hospitalAPI.getHospitals({
        search,
        crowd: crowdFilter,
        emergency: emergencyOnly ? 'true' : undefined
      });
      if (res.data.success) {
        setHospitals(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching hospitals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [search, crowdFilter, emergencyOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest block">Hospital Discovery Network</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Find Super Specialty Hospitals</h1>
        <p className="text-slate-400 text-sm">
          Discover verified hospitals, check real-time crowd surge density, and view live estimated waiting times.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hospitals by name, city, or medical specialty..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:border-teal-500 outline-none"
          />
        </div>

        {/* Crowd Filter Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={crowdFilter}
            onChange={(e) => setCrowdFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 text-sm focus:border-teal-500 outline-none"
          >
            <option value="">All Crowd Levels</option>
            <option value="Low">Low Crowd</option>
            <option value="Medium">Moderate Crowd</option>
            <option value="High">High Surge</option>
          </select>

          {/* Emergency Checkbox */}
          <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl whitespace-nowrap">
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={(e) => setEmergencyOnly(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-rose-500"
            />
            Emergency 24/7
          </label>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading hospitals...</div>
      ) : hospitals.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl border border-slate-800">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No hospitals matched your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hospitals.map((h) => (
            <div key={h._id} className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="relative">
                  <img
                    src={h.images?.[0] || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'}
                    alt={h.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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

                  <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">{h.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{h.description}</p>

                  {/* Facility Pills Teaser */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {h.facilities?.slice(0, 4).map((f, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{h.operatingHours}</span>
                <Link
                  to={`/hospitals/${h._id}`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-md shadow-teal-500/20"
                >
                  View Hospital & Queue Flow
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
