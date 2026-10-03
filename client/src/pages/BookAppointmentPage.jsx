import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { hospitalAPI, doctorAPI, appointmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Calendar, Building2, Stethoscope, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [searchParams] = useSearchParams();

  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [selectedHospital, setSelectedHospital] = useState(searchParams.get('hospital') || '');
  const [selectedDoctor, setSelectedDoctor] = useState(searchParams.get('doctor') || '');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reason, setReason] = useState('General Consultation');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const hRes = await hospitalAPI.getHospitals();
        if (hRes.data.success) setHospitals(hRes.data.data);
      } catch (err) {
        console.error('Failed to load hospitals:', err);
      }
    };
    fetchInitial();
  }, []);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const dRes = await doctorAPI.getDoctors({ hospital: selectedHospital });
        if (dRes.data.success) {
          setDoctors(dRes.data.data);
          if (dRes.data.data.length > 0 && !selectedDoctor) {
            setSelectedDoctor(dRes.data.data[0]._id);
          }
        }
      } catch (err) {
        console.error('Failed to load doctors:', err);
      }
    };
    if (selectedHospital) fetchDocs();
  }, [selectedHospital]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedDoctor && selectedDate) {
        try {
          const res = await doctorAPI.getDoctorSlots(selectedDoctor, selectedDate);
          if (res.data.success) {
            setSlots(res.data.data.slots);
          }
        } catch (err) {
          console.error('Failed to load slots:', err);
        }
      }
    };
    fetchSlots();
  }, [selectedDoctor, selectedDate]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please sign in to book an appointment.', 'warning');
      return navigate('/login');
    }
    if (!selectedSlot) {
      addToast('Please select a time slot.', 'error');
      return;
    }

    const docObj = doctors.find((d) => d._id === selectedDoctor);
    if (!docObj) return;

    setLoading(true);
    try {
      const res = await appointmentAPI.book({
        doctorId: docObj._id,
        hospitalId: docObj.hospital._id || selectedHospital,
        departmentId: docObj.department._id || docObj.department,
        date: selectedDate,
        timeSlot: selectedSlot,
        consultationType: 'In-person',
        reason
      });

      if (res.data.success) {
        addToast('Appointment booked successfully!', 'success');
        navigate('/dashboard');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Booking failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest block">Instant Booking Engine</span>
        <h1 className="text-3xl font-extrabold text-white">Book Your Consultation</h1>
        <p className="text-slate-400 text-xs">Conflict-free slot booking with immediate digital queue token reservation.</p>
      </div>

      <form onSubmit={handleBook} className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">

        {/* Step 1: Select Hospital */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-teal-400" /> 1. Select Hospital
          </label>
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:border-teal-500 outline-none"
          >
            <option value="">-- Choose Hospital --</option>
            {hospitals.map((h) => (
              <option key={h._id} value={h._id}>{h.name} ({h.address?.city})</option>
            ))}
          </select>
        </div>

        {/* Step 2: Select Doctor */}
        {selectedHospital && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-emerald-400" /> 2. Select Doctor / Specialist
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:border-teal-500 outline-none"
            >
              <option value="">-- Choose Doctor --</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>{d.name} ({d.specialty}) — ${d.consultationFee}</option>
              ))}
            </select>
          </div>
        )}

        {/* Step 3: Select Date & Time Slot */}
        {selectedDoctor && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" /> 3. Select Appointment Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">4. Available Time Slots</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={item.isBooked}
                    onClick={() => setSelectedSlot(item.slot)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
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

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">5. Medical Notes / Consultation Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. ECG Review / Routine Checkup"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:border-teal-500 outline-none"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading || !selectedSlot}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2"
        >
          {loading ? 'Confirming...' : 'Complete Appointment Booking'}
          <ArrowRight className="w-5 h-5" />
        </button>

      </form>
    </div>
  );
};
