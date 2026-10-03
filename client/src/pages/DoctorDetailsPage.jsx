import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorAPI, appointmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  Stethoscope, Calendar, Clock, MapPin, ShieldCheck, CheckCircle2,
  Video, UserCheck, Star, Award, Globe
} from 'lucide-react';

export const DoctorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultationType, setConsultationType] = useState('In-person');
  const [reason, setReason] = useState('General Consultation & Check-up');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true);
        const res = await doctorAPI.getDoctorById(id);
        if (res.data.success) {
          setDoctor(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load doctor:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (id && selectedDate) {
        try {
          const res = await doctorAPI.getDoctorSlots(id, selectedDate);
          if (res.data.success) {
            setSlots(res.data.data.slots);
          }
        } catch (err) {
          console.error('Failed to load slots:', err);
        }
      }
    };
    fetchSlots();
  }, [id, selectedDate]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please sign in to book an appointment.', 'warning');
      return navigate('/login');
    }
    if (!selectedSlot) {
      addToast('Please select an available time slot.', 'error');
      return;
    }

    setBooking(true);
    try {
      const res = await appointmentAPI.book({
        doctorId: doctor._id,
        hospitalId: doctor.hospital._id,
        departmentId: doctor.department._id,
        date: selectedDate,
        timeSlot: selectedSlot,
        consultationType,
        reason
      });

      if (res.data.success) {
        addToast('Appointment booked successfully!', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Booking failed.', 'error');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-slate-400">Loading doctor profile...</div>;
  if (!doctor) return <div className="text-center py-20 text-slate-400">Doctor not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Profile Info (Col-7) */}
        <div className="lg:col-span-7 space-y-6">

          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-slate-800 pb-6">
              <img
                src={doctor.avatar || 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80'}
                alt={doctor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-teal-500/30 shadow-lg"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">{doctor.specialty}</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{doctor.name}</h1>
                <p className="text-xs text-slate-300 font-semibold">{doctor.qualification}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> {doctor.hospital?.name} • {doctor.department?.name}
                </p>
                <div className="flex items-center gap-3 pt-2 text-xs">
                  <span className="text-amber-400 font-bold">⭐ {doctor.rating} ({doctor.reviewsCount} reviews)</span>
                  <span className="text-slate-400">• {doctor.experienceYears} Years Experience</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Biography & Clinical Expertise</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block">Languages</span>
                <span className="font-bold text-white">{doctor.languages?.join(', ')}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block">Consultation Fee</span>
                <span className="font-bold text-teal-300">${doctor.consultationFee}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                <span className="text-slate-400 block">Avg Consultation</span>
                <span className="font-bold text-emerald-400">15 Minutes</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Appointment Booking Console (Col-5) */}
        <div className="lg:col-span-5">
          <form onSubmit={handleBook} className="glass-card rounded-3xl p-6 sm:p-8 border border-teal-500/40 space-y-6 shadow-2xl">
            <h3 className="text-xl font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" /> Book Consultation Slot
            </h3>

            {/* Consultation Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Consultation Mode</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'In-person', label: 'In-person Visit', icon: UserCheck },
                  { id: 'Video', label: 'Video Consultation', icon: Video }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setConsultationType(item.id)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      consultationType === item.id
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500'
                        : 'bg-slate-900/60 text-slate-400 border-slate-700/60 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Appointment Date</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:border-teal-500 outline-none"
              />
            </div>

            {/* Select Time Slot */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Available Time Slots</label>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                {slots.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={item.isBooked}
                    onClick={() => setSelectedSlot(item.slot)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      item.isBooked
                        ? 'bg-slate-900 text-slate-600 border-slate-800 line-through cursor-not-allowed'
                        : selectedSlot === item.slot
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 border-teal-400 shadow-md'
                        : 'bg-slate-900/80 text-slate-200 border-slate-700/70 hover:border-teal-500/50'
                    }`}
                  >
                    {item.slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason for Visit */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reason for Consultation</label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or routine checkup..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:border-teal-500 outline-none"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={booking}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/20"
            >
              {booking ? 'Confirming Appointment...' : `Confirm Booking ($${doctor.consultationFee})`}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
