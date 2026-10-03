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
    console.log('🌱 Connecting to MongoDB for seeding...');
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
      phone: '+1-800-SUPER-ADMIN'
    });

    const hospitalAdmin = await User.create({
      name: 'Sarah Jenkins (Hospital Admin)',
      email: 'admin.citycare@mediflow.com',
      password,
      role: 'HOSPITAL_ADMIN',
      phone: '+1-800-CITY-ADMIN'
    });

    const demoPatient = await User.create({
      name: 'Rahul Sharma (Patient)',
      email: 'patient@mediflow.com',
      password,
      role: 'PATIENT',
      phone: '+1-555-019-2834',
      emergencyContact: {
        name: 'Priya Sharma',
        phone: '+1-555-019-9999',
        relationship: 'Spouse'
      },
      medicalHistory: ['Hypertension (Managed)', 'No known drug allergies']
    });

    // 2. Create Hospitals
    const createdHospitals = await Hospital.create(seedHospitals);
    const mainHospital = createdHospitals[0];

    // Assign hospital to Hospital Admin
    hospitalAdmin.hospital = mainHospital._id;
    await hospitalAdmin.save();

    console.log(`🏥 Created ${createdHospitals.length} Hospitals.`);

    // 3. Create Departments for each hospital
    let createdDepartments = [];
    for (const h of createdHospitals) {
      for (const d of seedDepartments) {
        const dept = await Department.create({
          ...d,
          hospital: h._id
        });
        createdDepartments.push(dept);
      }

      // Create facilities for hospital
      for (const f of seedFacilities) {
        await Facility.create({
          ...f,
          hospital: h._id
        });
      }
    }

    console.log(`🏢 Created ${createdDepartments.length} Departments and Facilities.`);

    // 4. Create 15+ Doctors across hospitals and departments
    const doctorListRaw = [
      { name: 'Dr. Ananya Rao', specialty: 'Cardiology', qualification: 'MD, DM Cardiology (Johns Hopkins)', experienceYears: 14, consultationFee: 120, languages: ['English', 'Spanish', 'Hindi'], avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80', email: 'doctor.ananya@mediflow.com' },
      { name: 'Dr. Vikramaditya Roy', specialty: 'Neurology', qualification: 'MD, M.Ch Neurosurgery', experienceYears: 18, consultationFee: 150, languages: ['English', 'German'], avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', email: 'doctor.vikram@mediflow.com' },
      { name: 'Dr. Sophia Chen', specialty: 'Orthopedics', qualification: 'MS Ortho, Joint Replacement Fellow', experienceYears: 11, consultationFee: 100, languages: ['English', 'Mandarin'], avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', email: 'doctor.sophia@mediflow.com' },
      { name: 'Dr. Michael Carter', specialty: 'Pediatrics', qualification: 'MD Pediatrics (Harvard Med)', experienceYears: 9, consultationFee: 90, languages: ['English'], avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80', email: 'doctor.michael@mediflow.com' },
      { name: 'Dr. Elena Rostova', specialty: 'Dermatology', qualification: 'MD Dermatology & Aesthetic Care', experienceYears: 8, consultationFee: 110, languages: ['English', 'Russian'], avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80', email: 'doctor.elena@mediflow.com' },
      { name: 'Dr. Rajesh Nambiar', specialty: 'General Medicine', qualification: 'MBBS, MD Internal Medicine', experienceYears: 16, consultationFee: 80, languages: ['English', 'Hindi', 'Malayalam'], avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', email: 'doctor.rajesh@mediflow.com' },
      { name: 'Dr. Amanda Foster', specialty: 'Cardiology', qualification: 'MD, FACC Interventional Cardio', experienceYears: 12, consultationFee: 130, languages: ['English'], avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80', email: 'doctor.amanda@mediflow.com' },
      { name: 'Dr. David Kim', specialty: 'Neurology', qualification: 'MD Neurology, Epilepsy Specialist', experienceYears: 10, consultationFee: 140, languages: ['English', 'Korean'], avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80', email: 'doctor.david@mediflow.com' },
      { name: 'Dr. Priya Nair', specialty: 'General Medicine', qualification: 'MD General Medicine', experienceYears: 7, consultationFee: 75, languages: ['English', 'Hindi'], avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', email: 'doctor.priya@mediflow.com' },
      { name: 'Dr. Robert Taylor', specialty: 'Orthopedics', qualification: 'MS Orthopedics, Spine Specialist', experienceYears: 15, consultationFee: 145, languages: ['English'], avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80', email: 'doctor.robert@mediflow.com' },
      { name: 'Dr. Lisa Ray', specialty: 'Pediatrics', qualification: 'MD Pediatrics, Neonatologist', experienceYears: 13, consultationFee: 95, languages: ['English', 'French'], avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80', email: 'doctor.lisa@mediflow.com' },
      { name: 'Dr. Kabir Mehta', specialty: 'Dermatology', qualification: 'MD Derm, Laser Specialist', experienceYears: 6, consultationFee: 105, languages: ['English', 'Hindi'], avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80', email: 'doctor.kabir@mediflow.com' },
      { name: 'Dr. Hannah Schmidt', specialty: 'General Medicine', qualification: 'MD Internal Medicine', experienceYears: 9, consultationFee: 85, languages: ['English', 'German'], avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c2c8f8b0?auto=format&fit=crop&w=400&q=80', email: 'doctor.hannah@mediflow.com' },
      { name: 'Dr. James Wilson', specialty: 'Cardiology', qualification: 'MD, DM Cardiac Electrophysiology', experienceYears: 20, consultationFee: 160, languages: ['English'], avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80', email: 'doctor.james@mediflow.com' },
      { name: 'Dr. Nina Patel', specialty: 'Pediatrics', qualification: 'MD Pediatrics', experienceYears: 7, consultationFee: 85, languages: ['English', 'Gujarati'], avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', email: 'doctor.nina@mediflow.com' }
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

      // Find matching department or assign first department of that hospital
      const dept = createdDepartments.find(
        d => d.hospital.toString() === targetHospital._id.toString() && d.name.toLowerCase().includes(docRaw.specialty.toLowerCase())
      ) || createdDepartments.find(d => d.hospital.toString() === targetHospital._id.toString());

      // Create User account for Doctor
      const docUser = await User.create({
        name: docRaw.name,
        email: docRaw.email,
        password,
        role: 'DOCTOR',
        phone: `+1-555-010-00${i + 1}`,
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
        reviewsCount: 24 + i * 5,
        languages: docRaw.languages,
        bio: `Leading Specialist in ${docRaw.specialty} with over ${docRaw.experienceYears} years of clinical experience. Dedicated to evidence-based healthcare and patient-first consultation.`,
        avatar: docRaw.avatar,
        isAvailable: true,
        availableDays,
        timeSlots,
        avgConsultationMinutes: 15
      });

      createdDoctors.push(doctor);
    }

    console.log(`👨‍⚕️ Created ${createdDoctors.length} Doctors with user accounts.`);

    // 5. Create Live Queues for first 3 Doctors in City Care Hospital
    const firstDoc = createdDoctors[0]; // Dr. Ananya Rao
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

    // 6. Create Appointments for Demo Patient
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

    // Create QueueEntry for Appt 1
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
      doctor: createdDoctors[1]._id, // Dr. Vikramaditya Roy
      hospital: createdDoctors[1].hospital,
      department: createdDoctors[1].department,
      date: '2026-09-20',
      timeSlot: '02:00 PM',
      consultationType: 'In-person',
      reason: 'Migraine & Tension Headache Assessment',
      status: 'COMPLETED',
      tokenNumber: 'N-12',
      doctorNotes: 'Patient advised to maintain regular sleep schedule. Prescribed mild prophylactic medication.',
      prescription: ['Tab Propranolol 40mg (1-0-1)', 'Tab Paracetamol 650mg SOS']
    });

    // Create sample review for completed appointment
    await Review.create({
      patient: demoPatient._id,
      doctor: createdDoctors[1]._id,
      hospital: createdDoctors[1].hospital,
      appointment: appt2._id,
      overallRating: 5,
      waitTimeRating: 5,
      staffRating: 5,
      facilityRating: 5,
      comment: 'Extremely professional doctor! The live queue feature estimated 15 mins and I was called in exactly 14 mins.'
    });

    // 7. Seed Notifications for Demo Patient
    await Notification.create({
      user: demoPatient._id,
      title: 'Active Queue Update',
      message: 'Your token A-27 is currently position #7 in Cardiology OPD. Estimated wait: 32 minutes.',
      type: 'QUEUE'
    });

    await Notification.create({
      user: demoPatient._id,
      title: 'Appointment Booked',
      message: 'Appointment #MF-20481 with Dr. Ananya Rao confirmed for today at 10:30 AM.',
      type: 'APPOINTMENT'
    });

    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('----------------------------------------------------');
    console.log('DEMO CREDENTIALS FOR TESTING:');
    console.log('Patient:       patient@mediflow.com / Password123!');
    console.log('Doctor:        doctor.ananya@mediflow.com / Password123!');
    console.log('Hospital Admin: admin.citycare@mediflow.com / Password123!');
    console.log('Super Admin:   superadmin@mediflow.com / Password123!');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
