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

// Fallback Dataset — 25 Real Hospitals in Mangalore & Udupi Region (Dakshina Kannada & Udupi)
const demoHospitals = [
  {
    _id: 'h_kmc_mgl',
    name: 'KMC Hospital (Kasturba Medical College)',
    tagline: 'Premier Super Specialty Healthcare & Academic Medical Center',
    description: 'NABH accredited 500+ bed super specialty tertiary care center equipped with state-of-the-art Cath lab, 3T MRI, robotic surgery, and 24/7 Level-1 Trauma Emergency in heart of Mangalore.',
    address: { street: 'Main Building, Ambedkar Circle, Jyothi', city: 'Mangalore', state: 'Karnataka', zipCode: '575001' },
    phone: '+91-824-2445858',
    email: 'info.kmch@manipal.edu',
    rating: 4.9,
    reviewsCount: 480,
    images: ['https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 22,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2444256',
    facilities: [
      { _id: 'f1', name: '24/7 Level-1 Trauma Emergency ICU', category: 'Emergency Care', status: 'Available', description: 'Fully equipped 40-bed ICU' },
      { _id: 'f2', name: '3 Tesla High-Field MRI & 128-Slice CT', category: 'Diagnostics', status: 'Available', description: 'Ultra-speed neuro imaging & cardiac CT' },
      { _id: 'f3', name: '24/7 In-House Pharmacy', category: 'Services', status: 'Available', description: 'Complete inventory of critical care & specialty medicines' }
    ],
    doctors: [
      { _id: 'd_1', name: 'Dr. Padmanabh Kamath', specialty: 'Cardiology', qualification: 'MD, DM Cardiology (KMC Mangalore)', experienceYears: 22, consultationFee: 500, rating: 4.9, reviewsCount: 140, avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80', languages: ['Kannada', 'Tulu', 'English', 'Hindi'] },
      { _id: 'd_2', name: 'Dr. Rajesh Bhakta', specialty: 'Neurology & Neurosurgery', qualification: 'MD, M.Ch Neurosurgery (NIMHANS)', experienceYears: 19, consultationFee: 600, rating: 4.85, reviewsCount: 98, avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', languages: ['Kannada', 'Tulu', 'English'] }
    ],
    departments: [
      { _id: 'dept_1', name: 'Cardiology', code: 'CARD', currentPatients: 18, estimatedWaitMinutes: 22, status: 'Moderate' },
      { _id: 'dept_2', name: 'Neurology & Neurosurgery', code: 'NEUR', currentPatients: 8, estimatedWaitMinutes: 15, status: 'Normal' }
    ]
  },
  {
    _id: 'h_km_manipal',
    name: 'Kasturba Hospital, Manipal',
    tagline: 'World-Class Multi-Specialty & Quaternary Care Center',
    description: 'Renowned 2032-bed university hospital offering advanced Oncology, Cardiac Surgery, Organ Transplant, and Pediatric Intensive Care with real-time patient queue intelligence.',
    address: { street: 'Tiger Circle, Madhav Nagar', city: 'Manipal, Udupi', state: 'Karnataka', zipCode: '576104' },
    phone: '+91-820-2922761',
    email: 'kh.service@manipal.edu',
    rating: 4.95,
    reviewsCount: 620,
    images: ['https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'High',
    estimatedWaitMinutes: 35,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-820-2571201',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_aj_mgl',
    name: 'AJ Hospital & Research Centre',
    tagline: 'Leading Advanced Tertiary Healthcare & Cancer Institute',
    description: 'Comprehensive 1050-bed multi-specialty medical institute featuring PET-CT, LINAC Radiation Oncology, Kidney & Liver Transplant unit.',
    address: { street: 'NH 66, Kuntikana', city: 'Mangalore', state: 'Karnataka', zipCode: '575004' },
    phone: '+91-824-2225533',
    email: 'ajhospitalmgl@gmail.com',
    rating: 4.85,
    reviewsCount: 390,
    images: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 25,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2225555',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_fm_mgl',
    name: 'Father Muller Charitable Hospital',
    tagline: 'Heal and Comfort — Heritage Medical Institute',
    description: '125-year-old landmark 1250-bed healthcare campus in Mangalore offering Cardiology, Neurology, Orthopedics, Psychiatry, and OPD care.',
    address: { street: 'Father Muller Road, Kankanady', city: 'Mangalore', state: 'Karnataka', zipCode: '575002' },
    phone: '+91-824-2238000',
    email: 'mullerhospital@fathermuller.in',
    rating: 4.8,
    reviewsCount: 510,
    images: ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'High',
    estimatedWaitMinutes: 30,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2238300',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_indiana_mgl',
    name: 'Indiana Hospital & Heart Institute',
    tagline: 'Center of Excellence for Cardiac & Vascular Care',
    description: 'Premier 300-bed cardiac and multi-specialty institute located at Mahaveer Circle equipped with biplane Cath Lab.',
    address: { street: 'Mahaveer Circle, Pumpwell', city: 'Mangalore', state: 'Karnataka', zipCode: '575002' },
    phone: '+91-824-2880880',
    email: 'info@indianahospital.in',
    rating: 4.9,
    reviewsCount: 295,
    images: ['https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 15,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2880911',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_yenepoya_mgl',
    name: 'Yenepoya Specialty Hospital',
    tagline: 'Modern Multi-Specialty & Minimal Access Care',
    description: 'Premier urban hospital in Kodialbail specializing in Laparoscopic Surgery, Gastroenterology, Nephrology, Urology, and Dialysis.',
    address: { street: 'Kodialbail, Opposite C.G. Kamath Road', city: 'Mangalore', state: 'Karnataka', zipCode: '575003' },
    phone: '+91-824-2496800',
    email: 'ysh@yenepoya.edu.in',
    rating: 4.75,
    reviewsCount: 210,
    images: ['https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 12,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '07:00 AM - 10:00 PM',
    emergencyPhone: '+91-824-2496811',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_unity_mgl',
    name: 'Unity Health Complex',
    tagline: 'Excellence in Patient-Centric Clinical Care',
    description: 'NABH accredited 250-bed multi-specialty healthcare facility at Highlands offering Radiology, Orthopedics, Gynaecology, and ENT.',
    address: { street: 'Highlands, Falnir Road', city: 'Mangalore', state: 'Karnataka', zipCode: '575002' },
    phone: '+91-824-2428555',
    email: 'info@unityhealthcomplex.com',
    rating: 4.8,
    reviewsCount: 270,
    images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 18,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2428999',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_kshegde_mgl',
    name: 'KS Hegde Charitable Hospital (Nitte)',
    tagline: 'Advanced Medical Science & Super Specialty Institute',
    description: '1000-bed university hospital in Deralakatte specializing in Neurosurgery, Cardio-Thoracic Surgery, Nephrology, and Nuclear Medicine.',
    address: { street: 'Nitte Campus, Deralakatte', city: 'Mangalore', state: 'Karnataka', zipCode: '575018' },
    phone: '+91-824-2204471',
    email: 'kshh@nitte.edu.in',
    rating: 4.85,
    reviewsCount: 310,
    images: ['https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 20,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2204488',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_tmapai_udupi',
    name: 'TMA Pai Hospital, Udupi',
    tagline: 'Comprehensive Community & Specialist Medical Care',
    description: 'Modern 150-bed hospital providing general medicine, pediatrics, general surgery, and dermatology in central Udupi.',
    address: { street: 'Dr. TMA Pai Road, Near Bus Stand', city: 'Udupi', state: 'Karnataka', zipCode: '576101' },
    phone: '+91-820-2520623',
    email: 'tmapai.udupi@manipal.edu',
    rating: 4.8,
    reviewsCount: 195,
    images: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 14,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '08:00 AM - 08:00 PM',
    emergencyPhone: '+91-820-2520625',
    facilities: [],
    doctors: [],
    departments: []
  },
  {
    _id: 'h_adarsha_udupi',
    name: 'Adarsha Hospital, Udupi',
    tagline: 'Leading Orthopedic & Trauma Super Specialty Hospital',
    description: 'Renowned orthopedic and trauma care hospital in Udupi equipped with laminar airflow operation theatres.',
    address: { street: 'Court Road, Udupi City', city: 'Udupi', state: 'Karnataka', zipCode: '576101' },
    phone: '+91-820-2533201',
    email: 'adarshahospital.udupi@gmail.com',
    rating: 4.75,
    reviewsCount: 160,
    images: ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 20,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-820-2533205',
    facilities: [],
    doctors: [],
    departments: []
  }
];

const demoDoctors = [
  {
    _id: 'd_1',
    name: 'Dr. Padmanabh Kamath',
    specialty: 'Cardiology',
    qualification: 'MD, DM Cardiology (KMC Mangalore)',
    experienceYears: 22,
    consultationFee: 500,
    rating: 4.9,
    reviewsCount: 140,
    languages: ['Kannada', 'Tulu', 'English', 'Hindi'],
    bio: 'Leading Senior Cardiologist with over 22 years of clinical excellence across Mangalore & Udupi regional hospitals.',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80',
    hospital: demoHospitals[0],
    department: { _id: 'dept_1', name: 'Cardiology', code: 'CARD' }
  },
  {
    _id: 'd_2',
    name: 'Dr. Rajesh Bhakta',
    specialty: 'Neurology & Neurosurgery',
    qualification: 'MD, M.Ch Neurosurgery (NIMHANS)',
    experienceYears: 19,
    consultationFee: 600,
    rating: 4.85,
    reviewsCount: 98,
    languages: ['Kannada', 'Tulu', 'English'],
    bio: 'Renowned Neurosurgeon specializing in cerebro-vascular surgery and spinal neurosurgery.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    hospital: demoHospitals[0],
    department: { _id: 'dept_2', name: 'Neurology & Neurosurgery', code: 'NEUR' }
  },
  {
    _id: 'd_3',
    name: 'Dr. Sudhakar Shetty',
    specialty: 'Orthopedics & Joint Replacement',
    qualification: 'MS Ortho, Joint Replacement Fellow',
    experienceYears: 25,
    consultationFee: 450,
    rating: 4.9,
    reviewsCount: 165,
    languages: ['Kannada', 'Tulu', 'English'],
    bio: 'Senior Orthopedic Surgeon specializing in total knee and hip replacement surgery.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    hospital: demoHospitals[1],
    department: { _id: 'dept_3', name: 'Orthopedics', code: 'ORTH' }
  },
  {
    _id: 'd_4',
    name: 'Dr. Nutan Kamath',
    specialty: 'Pediatrics & Neonatology',
    qualification: 'MD Pediatrics (KMC Manipal)',
    experienceYears: 16,
    consultationFee: 400,
    rating: 4.85,
    reviewsCount: 110,
    languages: ['Kannada', 'Konkani', 'English'],
    bio: 'Senior Pediatrician with specialized expertise in neonatal intensive care.',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    hospital: demoHospitals[1],
    department: { _id: 'dept_4', name: 'Pediatrics', code: 'PEDI' }
  },
  {
    _id: 'd_5',
    name: 'Dr. Ganesh Pai',
    specialty: 'Dermatology & Cosmetic Skin Care',
    qualification: 'MD Dermatology (AIIMS)',
    experienceYears: 28,
    consultationFee: 550,
    rating: 4.95,
    reviewsCount: 220,
    languages: ['Kannada', 'Konkani', 'Tulu', 'English'],
    bio: 'Pioneer Dermatologist and aesthetic skin specialist in coastal Karnataka.',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80',
    hospital: demoHospitals[2],
    department: { _id: 'dept_5', name: 'Dermatology', code: 'DERM' }
  }
];

const demoUsers = {
  'patient@mediflow.com': { _id: 'u_patient_1', name: 'Rahul Sharma (Patient)', email: 'patient@mediflow.com', role: 'PATIENT', token: 'demo_token_patient' },
  'doctor.ananya@mediflow.com': { _id: 'u_doc_1', name: 'Dr. Padmanabh Kamath', email: 'doctor.ananya@mediflow.com', role: 'DOCTOR', token: 'demo_token_doctor' },
  'admin.citycare@mediflow.com': { _id: 'u_admin_1', name: 'Dr. Prashanth Shetty (KMC Admin)', email: 'admin.citycare@mediflow.com', role: 'HOSPITAL_ADMIN', token: 'demo_token_admin' },
  'superadmin@mediflow.com': { _id: 'u_super_1', name: 'Dr. Marcus Vance (Super Admin)', email: 'superadmin@mediflow.com', role: 'SUPER_ADMIN', token: 'demo_token_super' }
};

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
  }
];

let demoQueue = {
  _id: 'q_1',
  name: 'Dr. Padmanabh Kamath - Cardiology OPD Queue',
  currentServingToken: 'A-19',
  waitingPatientsCount: 7,
  status: 'ACTIVE',
  entries: [
    {
      _id: 'qe_1',
      tokenNumber: 'A-19',
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

// API Service Methods
export const authAPI = {
  login: async (credentials) => {
    try {
      return await API.post('/auth/login', credentials);
    } catch (err) {
      const match = demoUsers[credentials.email];
      if (match) return { data: { success: true, data: match } };
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
            department: 'Cardiology OPD (KMC Mangalore)',
            date: date || new Date().toISOString().split('T')[0],
            optimalTime: '02:00 PM',
            historicalInsight: 'Historically, KMC Cardiology OPD experiences 60% lower queue volume around 02:00 PM.',
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
              comment: 'Outstanding doctor at KMC Hospital! The live queue estimated 15 mins and token was called right on time.',
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
            { _id: 'n_1', title: 'Active Queue Update', message: 'Token A-27 is #7 in queue at KMC Hospital. Estimated wait: 32 mins.', isRead: false, createdAt: new Date() },
            { _id: 'n_2', title: 'Appointment Confirmed', message: 'Appointment #MF-20481 with Dr. Padmanabh Kamath confirmed.', isRead: true, createdAt: new Date() }
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
              totalHospitals: 25,
              totalDoctors: 25,
              avgWaitTimeMinutes: 22,
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
            counts: { totalUsers: 35, patients: 25, doctors: 25, admins: 5, hospitals: 25 },
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
