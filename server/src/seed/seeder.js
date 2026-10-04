const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Hospital = require('../models/Hospital');
const Department = require('../models/Department');
const Doctor = require('../models/Doctor');
const Facility = require('../models/Facility');
const Queue = require('../models/Queue');
const QueueEntry = require('../models/QueueEntry');
const Appointment = require('../models/Appointment');
const Review = require('../models/Review');
const Notification = require('../models/Notification');
const { seedHospitals, seedDepartments, seedFacilities } = require('./seedData');

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mediflow';
    console.log('🌱 Connecting to MongoDB for regional seeding (Mangalore & Udupi)...');
    await mongoose.connect(mongoUri);

    // Clear existing data
    await User.deleteMany({});
    await Hospital.deleteMany({});
    await Department.deleteMany({});
    await Doctor.deleteMany({});
    await Facility.deleteMany({});
    await Queue.deleteMany({});
    await QueueEntry.deleteMany({});
    await Appointment.deleteMany({});
    await Review.deleteMany({});
    await Notification.deleteMany({});

    console.log('🧹 Cleaned existing database collections.');

    // 1. Create Core Demo Users
    const password = 'Password123!';

    const superAdmin = await User.create({
      name: 'Dr. Marcus Vance (Super Admin)',
      email: 'superadmin@mediflow.com',
      password,
      role: 'SUPER_ADMIN',
      phone: '+91-824-2900000'
    });

    const hospitalAdmin = await User.create({
      name: 'Dr. Prashanth Shetty (KMC Hospital Admin)',
      email: 'admin.citycare@mediflow.com',
      password,
      role: 'HOSPITAL_ADMIN',
      phone: '+91-824-2445858'
    });

    const demoPatient = await User.create({
      name: 'Rahul Sharma (Patient)',
      email: 'patient@mediflow.com',
      password,
      role: 'PATIENT',
      phone: '+91-98450-12345',
      emergencyContact: {
        name: 'Priya Sharma',
        phone: '+91-98450-99999',
        relationship: 'Spouse'
      },
      medicalHistory: ['Hypertension (Managed)', 'No known drug allergies']
    });

    // 2. Create 25 Real Hospitals in Mangalore & Udupi
    const createdHospitals = await Hospital.create(seedHospitals);
    const mainHospital = createdHospitals[0];

    hospitalAdmin.hospital = mainHospital._id;
    await hospitalAdmin.save();

    console.log(`🏥 Created ${createdHospitals.length} Real Hospitals in Mangalore & Udupi region.`);

    // 3. Create Departments & Facilities for each hospital
    let createdDepartments = [];
    for (const h of createdHospitals) {
      for (const d of seedDepartments) {
        const dept = await Department.create({
          ...d,
          hospital: h._id
        });
        createdDepartments.push(dept);
      }
      for (const f of seedFacilities) {
        await Facility.create({
          ...f,
          hospital: h._id
        });
      }
    }

    console.log(`🏢 Created ${createdDepartments.length} Departments & Facilities.`);

    // 4. Create 25+ Real Regional Specialist Doctors (Mangalore & Udupi Doctors)
    const doctorListRaw = [
      { name: 'Dr. Padmanabh Kamath', specialty: 'Cardiology', qualification: 'MD, DM Cardiology (KMC Mangalore)', experienceYears: 22, consultationFee: 500, languages: ['Kannada', 'Tulu', 'English', 'Hindi'], avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80', email: 'doctor.ananya@mediflow.com' },
      { name: 'Dr. Rajesh Bhakta', specialty: 'Neurology & Neurosurgery', qualification: 'MD, M.Ch Neurosurgery (NIMHANS)', experienceYears: 19, consultationFee: 600, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', email: 'doctor.vikram@mediflow.com' },
      { name: 'Dr. Sudhakar Shetty', specialty: 'Orthopedics & Joint Replacement', qualification: 'MS Ortho, Joint Replacement Fellow', experienceYears: 25, consultationFee: 450, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', email: 'doctor.sophia@mediflow.com' },
      { name: 'Dr. Nutan Kamath', specialty: 'Pediatrics & Neonatology', qualification: 'MD Pediatrics (KMC Manipal)', experienceYears: 16, consultationFee: 400, languages: ['Kannada', 'Konkani', 'English'], avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80', email: 'doctor.michael@mediflow.com' },
      { name: 'Dr. Ganesh Pai', specialty: 'Dermatology & Cosmetic Skin Care', qualification: 'MD Dermatology (AIIMS)', experienceYears: 28, consultationFee: 550, languages: ['Kannada', 'Konkani', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80', email: 'doctor.elena@mediflow.com' },
      { name: 'Dr. Chakrapani M', specialty: 'General Medicine & Diabetology', qualification: 'MBBS, MD Internal Medicine', experienceYears: 24, consultationFee: 400, languages: ['Kannada', 'Tulu', 'English', 'Hindi'], avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', email: 'doctor.rajesh@mediflow.com' },
      { name: 'Dr. Suresh Rao', specialty: 'Gastroenterology & Hepatology', qualification: 'MD, DM Gastroenterology', experienceYears: 18, consultationFee: 500, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80', email: 'doctor.amanda@mediflow.com' },
      { name: 'Dr. Manjunath Shenoy', specialty: 'Dermatology & Cosmetic Skin Care', qualification: 'MD Dermatology, FRCP', experienceYears: 20, consultationFee: 450, languages: ['Kannada', 'Konkani', 'English'], avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', email: 'doctor.david@mediflow.com' },
      { name: 'Dr. Jayaprakash Shetty', specialty: 'Oncology & Cancer Care', qualification: 'MD, DM Medical Oncology', experienceYears: 17, consultationFee: 650, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', email: 'doctor.priya@mediflow.com' },
      { name: 'Dr. Shrinivas Bhat', specialty: 'Nephrology & Urology', qualification: 'MD, DM Nephrology', experienceYears: 15, consultationFee: 500, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80', email: 'doctor.robert@mediflow.com' },
      { name: 'Dr. Deepa S', specialty: 'Obstetrics & Gynaecology', qualification: 'MS OBG, FICS', experienceYears: 14, consultationFee: 450, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80', email: 'doctor.lisa@mediflow.com' },
      { name: 'Dr. Devadas Rai', specialty: 'ENT & Head-Neck Surgery', qualification: 'MS ENT, DLO', experienceYears: 21, consultationFee: 400, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', email: 'doctor.kabir@mediflow.com' },
      { name: 'Dr. PV Bhandary', specialty: 'Psychiatry & Behavioral Health', qualification: 'MD Psychiatry (DNB)', experienceYears: 26, consultationFee: 500, languages: ['Kannada', 'Tulu', 'Konkani', 'English'], avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80', email: 'doctor.hannah@mediflow.com' },
      { name: 'Dr. Ranjan Shetty', specialty: 'Cardiology', qualification: 'MD, DM Interventional Cardio', experienceYears: 16, consultationFee: 550, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80', email: 'doctor.james@mediflow.com' },
      { name: 'Dr. Archana Bhat', specialty: 'Pediatrics & Neonatology', qualification: 'MD Pediatrics, DNB', experienceYears: 12, consultationFee: 400, languages: ['Kannada', 'Konkani', 'English'], avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', email: 'doctor.nina@mediflow.com' },
      { name: 'Dr. K V Devadiga', specialty: 'Neurology & Neurosurgery', qualification: 'MS, M.Ch Neurosurgery', experienceYears: 32, consultationFee: 700, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', email: 'doc.devadiga@mediflow.com' },
      { name: 'Dr. M Shantaram Shetty', specialty: 'Orthopedics & Joint Replacement', qualification: 'MS Ortho, FRCS', experienceYears: 35, consultationFee: 650, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80', email: 'doc.shantaram@mediflow.com' },
      { name: 'Dr. Harish Rao', specialty: 'General Medicine & Diabetology', qualification: 'MD General Medicine', experienceYears: 18, consultationFee: 400, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', email: 'doc.harish@mediflow.com' },
      { name: 'Dr. Sunita Nayak', specialty: 'Obstetrics & Gynaecology', qualification: 'MD OBG, Fellowship In Fetal Med', experienceYears: 15, consultationFee: 450, languages: ['Kannada', 'Konkani', 'English'], avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80', email: 'doc.sunita@mediflow.com' },
      { name: 'Dr. Ananth Prabhu', specialty: 'Gastroenterology & Hepatology', qualification: 'MD, DM Gastroenterology', experienceYears: 14, consultationFee: 500, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80', email: 'doc.ananth@mediflow.com' },
      { name: 'Dr. Vivek Sharma', specialty: 'Nephrology & Urology', qualification: 'MS, M.Ch Urology', experienceYears: 13, consultationFee: 550, languages: ['Kannada', 'Hindi', 'English'], avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80', email: 'doc.vivek@mediflow.com' },
      { name: 'Dr. Preeti Shetty', specialty: 'ENT & Head-Neck Surgery', qualification: 'MS ENT', experienceYears: 11, consultationFee: 400, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', email: 'doc.preeti@mediflow.com' },
      { name: 'Dr. Vignesh V', specialty: 'Oncology & Cancer Care', qualification: 'MS, M.Ch Surgical Oncology', experienceYears: 12, consultationFee: 600, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', email: 'doc.vignesh@mediflow.com' },
      { name: 'Dr. Vikram Shetty', specialty: 'Cardiology', qualification: 'MD, DM Cardio', experienceYears: 15, consultationFee: 500, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80', email: 'doc.vikramshetty@mediflow.com' },
      { name: 'Dr. Rashmi Udupa', specialty: 'Pediatrics & Neonatology', qualification: 'MD Pediatrics', experienceYears: 10, consultationFee: 350, languages: ['Kannada', 'Tulu', 'English'], avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80', email: 'doc.rashmi@mediflow.com' }
    ];

    const timeSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let createdDoctors = [];
    for (let i = 0; i < doctorListRaw.length; i++) {
      const docRaw = doctorListRaw[i];
      const targetHospital = createdHospitals[i % createdHospitals.length];

      const dept = createdDepartments.find(
        d => d.hospital.toString() === targetHospital._id.toString() && d.name.toLowerCase().includes(docRaw.specialty.toLowerCase().split(' ')[0])
      ) || createdDepartments.find(d => d.hospital.toString() === targetHospital._id.toString());

      const docUser = await User.create({
        name: docRaw.name,
        email: docRaw.email,
        password,
        role: 'DOCTOR',
        phone: `+91-98450-000${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
        specialty: docRaw.specialty,
        hospital: targetHospital._id
      });

      const doctor = await Doctor.create({
        user: docUser._id,
        hospital: targetHospital._id,
        department: dept._id,
        name: docRaw.name,
        specialty: docRaw.specialty,
        qualification: docRaw.qualification,
        experienceYears: docRaw.experienceYears,
        consultationFee: docRaw.consultationFee,
        rating: 4.8 + (i % 3) * 0.08,
        reviewsCount: 30 + i * 8,
        languages: docRaw.languages,
        bio: `Leading Senior Specialist in ${docRaw.specialty} with over ${docRaw.experienceYears} years of clinical expertise across Mangalore & Udupi regional hospitals.`,
        avatar: docRaw.avatar,
        isAvailable: true,
        availableDays,
        timeSlots,
        avgConsultationMinutes: 15
      });

      createdDoctors.push(doctor);
    }

    console.log(`👨‍⚕️ Created ${createdDoctors.length} Regional Doctors in Mangalore & Udupi.`);

    // 5. Create Live Queue for Dr. Padmanabh Kamath at KMC Hospital
    const firstDoc = createdDoctors[0];
    const firstQueue = await Queue.create({
      hospital: firstDoc.hospital,
      department: firstDoc.department,
      doctor: firstDoc._id,
      name: `${firstDoc.name} - Cardiology OPD Queue`,
      currentServingToken: 'A-19',
      totalPatientsToday: 26,
      waitingPatientsCount: 7,
      avgWaitPerPatient: 15,
      status: 'ACTIVE'
    });

    // 6. Create Initial Demo Appointment
    const todayStr = new Date().toISOString().split('T')[0];
    const appt1 = await Appointment.create({
      appointmentNumber: 'MF-20481',
      patient: demoPatient._id,
      doctor: firstDoc._id,
      hospital: firstDoc.hospital,
      department: firstDoc.department,
      date: todayStr,
      timeSlot: '10:30 AM',
      consultationType: 'In-person',
      reason: 'Routine Cardiology Follow-up & ECG Review',
      status: 'WAITING',
      tokenNumber: 'A-27',
      queuePosition: 7,
      estimatedWaitMinutes: 32
    });

    await QueueEntry.create({
      queue: firstQueue._id,
      appointment: appt1._id,
      patient: demoPatient._id,
      tokenNumber: 'A-27',
      position: 7,
      status: 'WAITING',
      estimatedWaitMinutes: 32
    });

    // Past completed appointment for demo patient
    const appt2 = await Appointment.create({
      appointmentNumber: 'MF-10932',
      patient: demoPatient._id,
      doctor: createdDoctors[1]._id, // Dr. Rajesh Bhakta
      hospital: createdDoctors[1].hospital,
      department: createdDoctors[1].department,
      date: '2026-09-20',
      timeSlot: '02:00 PM',
      consultationType: 'In-person',
      reason: 'Migraine & Tension Headache Assessment',
      status: 'COMPLETED',
      tokenNumber: 'N-12',
      doctorNotes: 'Patient advised regular sleep schedule. Prescribed mild prophylactic medication.',
      prescription: ['Tab Propranolol 40mg (1-0-1)', 'Tab Paracetamol 650mg SOS']
    });

    await Review.create({
      patient: demoPatient._id,
      doctor: createdDoctors[1]._id,
      hospital: createdDoctors[1].hospital,
      appointment: appt2._id,
      overallRating: 5,
      waitTimeRating: 5,
      staffRating: 5,
      facilityRating: 5,
      comment: 'Outstanding doctor! The live queue estimated 15 mins and I was called in exactly 14 mins.'
    });

    await Notification.create({
      user: demoPatient._id,
      title: 'Active Queue Update',
      message: 'Your token A-27 is currently position #7 in Cardiology OPD at KMC Hospital. Estimated wait: 32 minutes.',
      type: 'QUEUE'
    });

    console.log('✅ REGIONAL SEEDING (MANGALORE & UDUPI) COMPLETED SUCCESSFULLY!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
