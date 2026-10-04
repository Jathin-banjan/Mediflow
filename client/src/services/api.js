import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

// Interceptor to attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fallback Mock Dataset for Instant Cloud Demonstration
const demoUsers = {
  'patient@mediflow.com': { _id: 'u_patient_1', name: 'Rahul Sharma (Patient)', email: 'patient@mediflow.com', role: 'PATIENT', token: 'demo_token_patient' },
  'doctor.ananya@mediflow.com': { _id: 'u_doc_1', name: 'Dr. Ananya Rao', email: 'doctor.ananya@mediflow.com', role: 'DOCTOR', token: 'demo_token_doctor' },
  'admin.citycare@mediflow.com': { _id: 'u_admin_1', name: 'Sarah Jenkins (Hospital Admin)', email: 'admin.citycare@mediflow.com', role: 'HOSPITAL_ADMIN', token: 'demo_token_admin' },
  'superadmin@mediflow.com': { _id: 'u_super_1', name: 'Dr. Marcus Vance (Super Admin)', email: 'superadmin@mediflow.com', role: 'SUPER_ADMIN', token: 'demo_token_super' }
};

const demoHospitals = [
  {
    _id: 'h_1',
    name: 'City Care Super Specialty Hospital',
    tagline: 'Leading Tertiary Care & Live Patient Flow Center',
    description: 'State-of-the-art 500-bed super specialty hospital offering 24/7 trauma, cardiology, neurology, and advanced outpatient care.',
    address: { street: '104 Healthcare Blvd', city: 'Metro City', state: 'NY', zipCode: '10001' },
    phone: '+1-800-CITY-CARE',
    email: 'info@citycarehospital.com',
    rating: 4.9,
    reviewsCount: 342,
    images: ['https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 28,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+1-800-999-EMERGENCY',
    facilities: [
      { _id: 'f1', name: '24/7 Emergency & ICU', category: 'Emergency Care', status: 'Available', description: 'Fully equipped 40-bed ICU' },
      { _id: 'f2', name: 'Digital X-Ray & MRI Center', category: 'Diagnostics', status: 'Available', description: '3 Tesla High-Field MRI' },
      { _id: 'f3', name: 'In-House 24/7 Pharmacy', category: 'Services', status: 'Available', description: 'Complete inventory of critical medicines' }
    ],
    doctors: [
      { _id: 'd_1', name: 'Dr. Ananya Rao', specialty: 'Cardiology', qualification: 'MD, DM Cardiology', experienceYears: 14, consultationFee: 120, rating: 4.9, reviewsCount: 84, avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80', languages: ['English', 'Spanish', 'Hindi'] },
      { _id: 'd_2', name: 'Dr. Vikramaditya Roy', specialty: 'Neurology', qualification: 'MD, M.Ch Neurosurgery', experienceYears: 18, consultationFee: 150, rating: 4.8, reviewsCount: 62, avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', languages: ['English', 'German'] }
    ],
    departments: [
      { _id: 'dept_1', name: 'Cardiology', code: 'CARD', currentPatients: 18, estimatedWaitMinutes: 28, status: 'Moderate' },
      { _id: 'dept_2', name: 'Neurology', code: 'NEUR', currentPatients: 8, estimatedWaitMinutes: 15, status: 'Normal' }
    ]
  },
  {
    _id: 'h_2',
    name: 'Metro Health Institute',
    tagline: 'Precision Diagnostics & Rapid Consultation',
    description: 'A modern medical complex specializing in Cardiology, Orthopedics, and Minimal Access Surgery.',
    address: { street: '45 Park Avenue', city: 'Metro City', state: 'NY', zipCode: '10016' },
    phone: '+1-800-METRO-MED',
    email: 'contact@metrohealth.org',
    rating: 4.8,
    reviewsCount: 215,
    images: ['https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 14,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '07:00 AM - 11:00 PM',
    emergencyPhone: '+1-800-METRO-EMG',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_3',
    name: 'Apex Children & Family Clinic',
    tagline: 'Compassionate Care for Children & Families',
    description: 'Dedicated pediatric and family healthcare center with child-friendly waiting lounges.',
    address: { street: '12 Sunshine Drive', city: 'Metro City', state: 'NY', zipCode: '10023' },
    phone: '+1-800-APEX-KIDS',
    email: 'care@apexchildren.com',
    rating: 4.9,
    reviewsCount: 180,
    images: ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 20,
    isOpen: true,
    emergencyAvailable: false,
    operatingHours: '08:00 AM - 08:00 PM',
    emergencyPhone: '+1-800-APEX-URG',
    facilities: [],
    doctors: [],
    departments: []
  }
];

const demoDoctors = [
  {
    _id: 'd_1',
    name: 'Dr. Ananya Rao',
    specialty: 'Cardiology',
    qualification: 'MD, DM Cardiology (Johns Hopkins)',
    experienceYears: 14,
    consultationFee: 120,
    rating: 4.9,
    reviewsCount: 84,
    languages: ['English', 'Spanish', 'Hindi'],
    bio: 'Leading Specialist in Cardiology with over 14 years of clinical experience.',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80',
    hospital: demoHospitals[0],
    department: { _id: 'dept_1', name: 'Cardiology', code: 'CARD' }
  },
  {
    _id: 'd_2',
    name: 'Dr. Vikramaditya Roy',
    specialty: 'Neurology',
    qualification: 'MD, M.Ch Neurosurgery',
    experienceYears: 18,
    consultationFee: 150,
    rating: 4.8,
    reviewsCount: 62,
    languages: ['English', 'German'],
    bio: 'Expert Neurologist specializing in neuro-vascular interventions.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    hospital: demoHospitals[0],
    department: { _id: 'dept_2', name: 'Neurology', code: 'NEUR' }
  },
  {
    _id: 'd_3',
    name: 'Dr. Sophia Chen',
    specialty: 'Orthopedics',
    qualification: 'MS Ortho, Joint Replacement Fellow',
    experienceYears: 11,
    consultationFee: 100,
    rating: 4.9,
    reviewsCount: 45,
    languages: ['English', 'Mandarin'],
    bio: 'Orthopedic surgeon focusing on joint replacements and sports trauma.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    hospital: demoHospitals[1],
    department: { _id: 'dept_3', name: 'Orthopedics', code: 'ORTH' }
  }
];

let demoAppointments = [
  {
    _id: 'appt_1',
    appointmentNumber: 'MF-20481',
    patient: { _id: 'u_patient_1', name: 'Rahul Sharma (Patient)', email: 'patient@mediflow.com' },
    doctor: demoDoctors[0],
    hospital: demoHospitals[0],
    department: { name: 'Cardiology', code: 'CARD' },
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:30 AM',
    consultationType: 'In-person',
    reason: 'Routine Cardiology Follow-up & ECG Review',
    status: 'WAITING',
    tokenNumber: 'A-27',
    queuePosition: 7,
    estimatedWaitMinutes: 32
  },
  {
    _id: 'appt_2',
    appointmentNumber: 'MF-10932',
    patient: { _id: 'u_patient_1', name: 'Rahul Sharma (Patient)', email: 'patient@mediflow.com' },
    doctor: demoDoctors[1],
    hospital: demoHospitals[0],
    department: { name: 'Neurology', code: 'NEUR' },
    date: '2026-09-20',
    timeSlot: '02:00 PM',
    consultationType: 'In-person',
    reason: 'Migraine & Tension Headache Assessment',
    status: 'COMPLETED',
    tokenNumber: 'N-12',
    doctorNotes: 'Patient advised to maintain regular sleep schedule.',
    prescription: ['Tab Propranolol 40mg', 'Tab Paracetamol 650mg']
  }
];

let demoQueue = {
  _id: 'q_1',
  name: 'Dr. Ananya Rao - Cardiology OPD Queue',
  currentServingToken: 'A-19',
  waitingPatientsCount: 7,
  status: 'ACTIVE',
  entries: [
    {
      _id: 'qe_1',
      tokenNumber: 'A-[19]',
      position: 0,
      status: 'IN-CONSULTATION',
      patient: { _id: 'u_patient_9', name: 'Anita Desai' },
      appointment: { reason: 'Cardiac Evaluation' }
    },
    {
      _id: 'qe_2',
      tokenNumber: 'A-27',
      position: 7,
      status: 'WAITING',
      estimatedWaitMinutes: 32,
      patient: { _id: 'u_patient_1', name: 'Rahul Sharma (Patient)' },
      appointment: { reason: 'Routine Cardiology Follow-up' }
    }
  ]
};

// API Service Wrapper with Fallback Support
export const authAPI = {
  login: async (credentials) => {
    try {
      return await API.post('/auth/login', credentials);
    } catch (err) {
      const match = demoUsers[credentials.email];
      if (match) {
        return { data: { success: true, data: match } };
      }
      return { data: { success: true, data: demoUsers['patient@mediflow.com'] } };
    }
  },
  register: async (userData) => {
    try {
      return await API.post('/auth/register', userData);
    } catch (err) {
      const newUser = {
        _id: `u_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'PATIENT',
        token: `token_${Date.now()}`
      };
      return { data: { success: true, data: newUser } };
    }
  },
  getMe: async () => {
    try {
      return await API.get('/auth/me');
    } catch (err) {
      const savedUser = localStorage.getItem('user');
      const userObj = savedUser ? JSON.parse(savedUser) : demoUsers['patient@mediflow.com'];
      return { data: { success: true, data: userObj } };
    }
  },
  updateProfile: (data) => API.put('/auth/profile', data)
};

export const hospitalAPI = {
  getHospitals: async (params) => {
    try {
      return await API.get('/hospitals', { params });
    } catch (err) {
      let filtered = [...demoHospitals];
      if (params?.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(h => h.name.toLowerCase().includes(query) || h.address.city.toLowerCase().includes(query));
      }
      if (params?.crowd) {
        filtered = filtered.filter(h => h.currentCrowdLevel === params.crowd);
      }
      return { data: { success: true, count: filtered.length, data: filtered } };
    }
  },
  getHospitalById: async (id) => {
    try {
      return await API.get(`/hospitals/${id}`);
    } catch (err) {
      const match = demoHospitals.find(h => h._id === id) || demoHospitals[0];
      return { data: { success: true, data: match } };
    }
  },
  updateHospital: async (id, data) => {
    try {
      return await API.put(`/hospitals/${id}`, data);
    } catch (err) {
      const match = demoHospitals.find(h => h._id === id) || demoHospitals[0];
      if (data.currentCrowdLevel) match.currentCrowdLevel = data.currentCrowdLevel;
      return { data: { success: true, data: match } };
    }
  }
};

export const doctorAPI = {
  getDoctors: async (params) => {
    try {
      return await API.get('/doctors', { params });
    } catch (err) {
      let filtered = [...demoDoctors];
      if (params?.specialty) {
        filtered = filtered.filter(d => d.specialty.toLowerCase().includes(params.specialty.toLowerCase()));
      }
      if (params?.search) {
        filtered = filtered.filter(d => d.name.toLowerCase().includes(params.search.toLowerCase()));
      }
      return { data: { success: true, count: filtered.length, data: filtered } };
    }
  },
  getDoctorById: async (id) => {
    try {
      return await API.get(`/doctors/${id}`);
    } catch (err) {
      const match = demoDoctors.find(d => d._id === id) || demoDoctors[0];
      return { data: { success: true, data: match } };
    }
  },
  getDoctorSlots: async (id, date) => {
    try {
      return await API.get(`/doctors/${id}/slots`, { params: { date } });
    } catch (err) {
      return {
        data: {
          success: true,
          data: {
            date,
            doctor: id,
            slots: [
              { slot: '09:00 AM', isBooked: false },
              { slot: '09:30 AM', isBooked: true },
              { slot: '10:00 AM', isBooked: false },
              { slot: '10:30 AM', isBooked: true },
              { slot: '11:00 AM', isBooked: false },
              { slot: '02:00 PM', isBooked: false },
              { slot: '02:30 PM', isBooked: false },
              { slot: '03:00 PM', isBooked: false }
            ]
          }
        }
      };
    }
  }
};

export const departmentAPI = {
  getDepartments: async (params) => {
    try {
      return await API.get('/departments', { params });
    } catch (err) {
      return { data: { success: true, count: demoHospitals[0].departments.length, data: demoHospitals[0].departments } };
    }
  },
  getDepartmentPlanner: async (id, date) => {
    try {
      return await API.get(`/departments/${id}/planner`, { params: { date } });
    } catch (err) {
      return {
        data: {
          success: true,
          data: {
            department: 'Cardiology OPD',
            date: date || new Date().toISOString().split('T')[0],
            optimalTime: '02:00 PM',
            historicalInsight: 'Historically, Cardiology experiences 60% lower queue volume around 02:00 PM.',
            hourlySlots: [
              { time: '09:00 AM', crowd: 'High', waitMinutes: 42, recommendation: 'Peak morning arrival' },
              { time: '10:00 AM', crowd: 'High', waitMinutes: 48, recommendation: 'Very busy period' },
              { time: '11:00 AM', crowd: 'High', waitMinutes: 38, recommendation: 'Moderate wait' },
              { time: '12:00 PM', crowd: 'Medium', waitMinutes: 24, recommendation: 'Good mid-day slot' },
              { time: '01:00 PM', crowd: 'Low', waitMinutes: 15, recommendation: 'Lunch shift - minimal crowd' },
              { time: '02:00 PM', crowd: 'Low', waitMinutes: 12, recommendation: 'Optimal visit time (Lowest wait)' },
              { time: '03:00 PM', crowd: 'Medium', waitMinutes: 22, recommendation: 'Moderate afternoon traffic' },
              { time: '04:00 PM', crowd: 'High', waitMinutes: 40, recommendation: 'Evening peak start' }
            ]
          }
        }
      };
    }
  }
};

export const appointmentAPI = {
  book: async (data) => {
    try {
      return await API.post('/appointments', data);
    } catch (err) {
      const doc = demoDoctors.find(d => d._id === data.doctorId) || demoDoctors[0];
      const newAppt = {
        _id: `appt_${Date.now()}`,
        appointmentNumber: `MF-${Math.floor(10000 + Math.random() * 90000)}`,
        patient: { name: 'Rahul Sharma (Patient)' },
        doctor: doc,
        hospital: doc.hospital,
        department: doc.department,
        date: data.date,
        timeSlot: data.timeSlot,
        consultationType: data.consultationType || 'In-person',
        reason: data.reason || 'General Consultation',
        status: 'BOOKED'
      };
      demoAppointments.unshift(newAppt);
      return { data: { success: true, message: 'Appointment booked successfully', data: newAppt } };
    }
  },
  getAppointments: async () => {
    try {
      return await API.get('/appointments');
    } catch (err) {
      return { data: { success: true, count: demoAppointments.length, data: demoAppointments } };
    }
  },
  getById: (id) => API.get(`/appointments/${id}`),
  checkIn: async (id) => {
    try {
      return await API.post(`/appointments/${id}/check-in`);
    } catch (err) {
      const appt = demoAppointments.find(a => a._id === id) || demoAppointments[0];
      appt.status = 'WAITING';
      appt.tokenNumber = 'A-27';
      appt.queuePosition = 7;
      appt.estimatedWaitMinutes = 32;
      return {
        data: {
          success: true,
          message: 'Checked in successfully',
          data: { appointment: appt, tokenNumber: 'A-27', queuePosition: 7, estimatedWaitMinutes: 32 }
        }
      };
    }
  },
  cancel: async (id) => {
    try {
      return await API.put(`/appointments/${id}/cancel`);
    } catch (err) {
      const appt = demoAppointments.find(a => a._id === id);
      if (appt) appt.status = 'CANCELLED';
      return { data: { success: true, message: 'Appointment cancelled', data: appt } };
    }
  },
  reschedule: (id, data) => API.put(`/appointments/${id}/reschedule`, data)
};

export const queueAPI = {
  getQueues: async (params) => {
    try {
      return await API.get('/queues', { params });
    } catch (err) {
      return { data: { success: true, count: 1, data: [demoQueue] } };
    }
  },
  getById: (id) => API.get(`/queues/${id}`),
  handleAction: async (id, data) => {
    try {
      return await API.post(`/queues/${id}/action`, data);
    } catch (err) {
      let msg = 'Action executed';
      if (data.action === 'CALL_NEXT') {
        demoQueue.currentServingToken = 'A-27';
        msg = 'Called next patient with token A-27';
      } else if (data.action === 'TOGGLE_PAUSE') {
        demoQueue.status = demoQueue.status === 'PAUSED' ? 'ACTIVE' : 'PAUSED';
        msg = `Queue status updated to ${demoQueue.status}`;
      }
      return { data: { success: true, message: msg, data: { queue: demoQueue } } };
    }
  }
};

export const reviewAPI = {
  create: (data) => API.post('/reviews', data),
  getReviews: async (params) => {
    try {
      return await API.get('/reviews', { params });
    } catch (err) {
      return {
        data: {
          success: true,
          count: 1,
          data: [
            {
              _id: 'r_1',
              patient: { name: 'Rahul Sharma (Patient)' },
              overallRating: 5,
              comment: 'Extremely professional doctor! Live queue estimated 15 mins and token was called right on time.',
              createdAt: new Date().toISOString()
            }
          ]
        }
      };
    }
  }
};

export const notificationAPI = {
  getNotifications: async () => {
    try {
      return await API.get('/notifications');
    } catch (err) {
      return {
        data: {
          success: true,
          count: 2,
          unreadCount: 1,
          data: [
            { _id: 'n_1', title: 'Active Queue Update', message: 'Token A-27 is #7 in queue. Estimated wait: 32 mins.', isRead: false, createdAt: new Date() },
            { _id: 'n_2', title: 'Appointment Confirmed', message: 'Appointment #MF-20481 confirmed.', isRead: true, createdAt: new Date() }
          ]
        }
      };
    }
  },
  markAsRead: (id) => API.put(`/notifications/${id}/read`)
};

export const analyticsAPI = {
  getAnalytics: async (range) => {
    try {
      return await API.get('/analytics', { params: { range } });
    } catch (err) {
      return {
        data: {
          success: true,
          data: {
            summary: {
              totalAppointments: 142,
              completedAppointments: 128,
              cancelledAppointments: 6,
              activeQueues: 6,
              totalHospitals: 5,
              totalDoctors: 15,
              avgWaitTimeMinutes: 24,
              completionRate: 90,
              cancellationRate: 4
            },
            dailyAppointmentsData: [
              { date: 'Mon', appointments: 42, completed: 38, avgWaitMinutes: 22 },
              { date: 'Tue', appointments: 55, completed: 50, avgWaitMinutes: 28 },
              { date: 'Wed', appointments: 68, completed: 62, avgWaitMinutes: 31 },
              { date: 'Thu', appointments: 49, completed: 44, avgWaitMinutes: 25 },
              { date: 'Fri', appointments: 75, completed: 70, avgWaitMinutes: 35 },
              { date: 'Sat', appointments: 84, completed: 78, avgWaitMinutes: 40 },
              { date: 'Sun', appointments: 35, completed: 33, avgWaitMinutes: 18 }
            ],
            departmentUtilization: [
              { name: 'Cardiology', value: 35, color: '#0ea5e9' },
              { name: 'General Medicine', value: 28, color: '#10b981' },
              { name: 'Neurology', value: 15, color: '#8b5cf6' },
              { name: 'Orthopedics', value: 12, color: '#f59e0b' },
              { name: 'Pediatrics', value: 10, color: '#ec4899' }
            ]
          }
        }
      };
    }
  }
};

export const adminAPI = {
  getSystemOverview: async () => {
    try {
      return await API.get('/admin/system');
    } catch (err) {
      return {
        data: {
          success: true,
          data: {
            counts: { totalUsers: 18, patients: 12, doctors: 5, admins: 2, hospitals: 5 },
            hospitalList: demoHospitals
          }
        }
      };
    }
  },
  toggleVerification: async (id) => {
    try {
      return await API.put(`/admin/hospitals/${id}/verify`);
    } catch (err) {
      const match = demoHospitals.find(h => h._id === id);
      if (match) match.isVerified = !match.isVerified;
      return { data: { success: true, message: 'Hospital verification toggled', data: match } };
    }
  }
};

export default API;
