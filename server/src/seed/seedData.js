/**
 * Real Healthcare Network Seed Data — Mangalore & Udupi Region (Dakshina Kannada & Udupi Districts)
 */

const seedHospitals = [
  {
    name: 'KMC Hospital (Kasturba Medical College)',
    tagline: 'Premier Super Specialty Healthcare & Academic Medical Center',
    description: 'NABH accredited 500+ bed super specialty tertiary care center equipped with state-of-the-art Cath lab, 3T MRI, robotic surgery, and 24/7 Level-1 Trauma Emergency in heart of Mangalore.',
    address: {
      street: 'Main Building, Ambedkar Circle, Jyothi',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575001',
      coordinates: { lat: 12.8703, lng: 74.8436 }
    },
    phone: '+91-824-2445858',
    email: 'info.kmch@manipal.edu',
    rating: 4.9,
    reviewsCount: 480,
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 22,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2444256'
  },
  {
    name: 'Kasturba Hospital, Manipal',
    tagline: 'World-Class Multi-Specialty & Quaternary Care Center',
    description: 'Renowned 2032-bed university hospital offering advanced Oncology, Cardiac Surgery, Organ Transplant, and Pediatric Intensive Care with real-time patient queue intelligence.',
    address: {
      street: 'Tiger Circle, Madhav Nagar',
      city: 'Manipal, Udupi',
      state: 'Karnataka',
      zipCode: '576104',
      coordinates: { lat: 13.3525, lng: 74.7866 }
    },
    phone: '+91-820-2922761',
    email: 'kh.service@manipal.edu',
    rating: 4.95,
    reviewsCount: 620,
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'High',
    estimatedWaitMinutes: 35,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-820-2571201'
  },
  {
    name: 'AJ Hospital & Research Centre',
    tagline: 'Leading Advanced Tertiary Healthcare & Cancer Institute',
    description: 'Comprehensive 1050-bed multi-specialty medical institute featuring PET-CT, LINAC Radiation Oncology, Kidney & Liver Transplant unit, and 24/7 Critical Care Emergency.',
    address: {
      street: 'NH 66, Kuntikana',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575004',
      coordinates: { lat: 12.8941, lng: 74.8569 }
    },
    phone: '+91-824-2225533',
    email: 'ajhospitalmgl@gmail.com',
    rating: 4.85,
    reviewsCount: 390,
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 25,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2225555'
  },
  {
    name: 'Father Muller Charitable Hospital',
    tagline: 'Heal and Comfort — Heritage Medical Institute',
    description: '125-year-old landmark 1250-bed healthcare campus in Mangalore offering Cardiology, Neurology, Orthopedics, Psychiatry, and specialized Outpatient OPD care.',
    address: {
      street: 'Father Muller Road, Kankanady',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575002',
      coordinates: { lat: 12.8661, lng: 74.8532 }
    },
    phone: '+91-824-2238000',
    email: 'mullerhospital@fathermuller.in',
    rating: 4.8,
    reviewsCount: 510,
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'High',
    estimatedWaitMinutes: 30,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2238300'
  },
  {
    name: 'Indiana Hospital & Heart Institute',
    tagline: 'Center of Excellence for Cardiac & Vascular Care',
    description: 'Premier 300-bed cardiac and multi-specialty institute located at Mahaveer Circle equipped with biplane Cath Lab and round-the-clock emergency coronary intervention.',
    address: {
      street: 'Mahaveer Circle, Pumpwell',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575002',
      coordinates: { lat: 12.8598, lng: 74.8631 }
    },
    phone: '+91-824-2880880',
    email: 'info@indianahospital.in',
    rating: 4.9,
    reviewsCount: 295,
    images: [
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 15,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2880911'
  },
  {
    name: 'Yenepoya Specialty Hospital',
    tagline: 'Modern Multi-Specialty & Minimal Access Care',
    description: 'Premier urban hospital in Kodialbail specializing in Laparoscopic Surgery, Gastroenterology, Nephrology, Urology, and 24/7 Dialysis.',
    address: {
      street: 'Kodialbail, Opposite C.G. Kamath Road',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575003',
      coordinates: { lat: 12.8755, lng: 74.8410 }
    },
    phone: '+91-824-2496800',
    email: 'ysh@yenepoya.edu.in',
    rating: 4.75,
    reviewsCount: 210,
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 12,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '07:00 AM - 10:00 PM',
    emergencyPhone: '+91-824-2496811'
  },
  {
    name: 'Unity Health Complex',
    tagline: 'Excellence in Patient-Centric Clinical Care',
    description: 'NABH accredited 250-bed multi-specialty healthcare facility at Highlands offering advanced Radiology, Orthopedics, Gynaecology, and ENT.',
    address: {
      street: 'Highlands, Falnir Road',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575002',
      coordinates: { lat: 12.8682, lng: 74.8485 }
    },
    phone: '+91-824-2428555',
    email: 'info@unityhealthcomplex.com',
    rating: 4.8,
    reviewsCount: 270,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 18,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2428999'
  },
  {
    name: 'KS Hegde Charitable Hospital (Nitte)',
    tagline: 'Advanced Medical Science & Super Specialty Institute',
    description: '1000-bed university hospital in Deralakatte specializing in Neurosurgery, Cardio-Thoracic Surgery, Nephrology, and Nuclear Medicine.',
    address: {
      street: 'Nitte Campus, Deralakatte',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575018',
      coordinates: { lat: 12.8130, lng: 74.8965 }
    },
    phone: '+91-824-2204471',
    email: 'kshh@nitte.edu.in',
    rating: 4.85,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 20,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2204488'
  },
  {
    name: 'TMA Pai Hospital, Udupi',
    tagline: 'Comprehensive Community & Specialist Medical Care',
    description: 'Modern 150-bed hospital providing general medicine, pediatrics, general surgery, and dermatology in central Udupi.',
    address: {
      street: 'Dr. TMA Pai Road, Near Bus Stand',
      city: 'Udupi',
      state: 'Karnataka',
      zipCode: '576101',
      coordinates: { lat: 13.3409, lng: 74.7421 }
    },
    phone: '+91-820-2520623',
    email: 'tmapai.udupi@manipal.edu',
    rating: 4.8,
    reviewsCount: 195,
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 14,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '08:00 AM - 08:00 PM',
    emergencyPhone: '+91-820-2520625'
  },
  {
    name: 'Adarsha Hospital, Udupi',
    tagline: 'Leading Orthopedic & Trauma Super Specialty Hospital',
    description: 'Renowned orthopedic and trauma care hospital in Udupi equipped with laminar airflow operation theatres and joint replacement units.',
    address: {
      street: 'Court Road, Udupi City',
      city: 'Udupi',
      state: 'Karnataka',
      zipCode: '576101',
      coordinates: { lat: 13.3420, lng: 74.7450 }
    },
    phone: '+91-820-2533201',
    email: 'adarshahospital.udupi@gmail.com',
    rating: 4.75,
    reviewsCount: 160,
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 20,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-820-2533205'
  },
  {
    name: 'Lombard Memorial Hospital',
    tagline: 'Century-Old Pioneer in Healthcare Excellence',
    description: 'Historic 200-bed charitable hospital in Udupi offering Pediatrics, Obstetrics & Gynaecology, General Surgery, and OPD consultations.',
    address: {
      street: 'Mission Compound, Near Service Bus Stand',
      city: 'Udupi',
      state: 'Karnataka',
      zipCode: '576101',
      coordinates: { lat: 13.3385, lng: 74.7470 }
    },
    phone: '+91-820-2520330',
    email: 'lombardhospital@gmail.com',
    rating: 4.7,
    reviewsCount: 185,
    images: [
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 10,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-820-2520335'
  },
  {
    name: 'Tejasvini Hospital & SSIOT',
    tagline: 'Super Specialty Institute of Orthopedics & Trauma',
    description: 'Dedicated orthopedic center in Kadri specializing in arthroscopy, spine surgery, pediatric orthopedics, and physical rehabilitation.',
    address: {
      street: 'Kadri Temple Road',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575002',
      coordinates: { lat: 12.8820, lng: 74.8550 }
    },
    phone: '+91-824-2218100',
    email: 'info@tejasvinihospital.com',
    rating: 4.85,
    reviewsCount: 230,
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 18,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '08:00 AM - 09:00 PM',
    emergencyPhone: '+91-824-2218105'
  },
  {
    name: 'Athena Hospital',
    tagline: 'Compassionate Medical & Surgical Excellence',
    description: '300-bed super specialty medical complex in Falnir offering Gastroenterology, Urology, Cardiology, Pulmonology, and Critical Care.',
    address: {
      street: 'Falnir Road',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575001',
      coordinates: { lat: 12.8640, lng: 74.8450 }
    },
    phone: '+91-824-2442220',
    email: 'athenahospitalmgl@gmail.com',
    rating: 4.8,
    reviewsCount: 275,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 22,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2442225'
  },
  {
    name: 'Srinivas Hospital & Research Centre',
    tagline: 'Modern Multi-Specialty Coastal Health Complex',
    description: '1000-bed tertiary care institute in Mukka, Surathkal featuring advanced CT scan, ICU suites, and round-the-clock emergency casualty.',
    address: {
      street: 'NH 66, Mukka, Surathkal',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '574146',
      coordinates: { lat: 13.0080, lng: 74.7920 }
    },
    phone: '+91-824-2477456',
    email: 'info@srinivashospital.com',
    rating: 4.75,
    reviewsCount: 140,
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 12,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2477460'
  },
  {
    name: 'Kanachur Hospital & Research Centre',
    tagline: 'Holistic Super Specialty Medical Care',
    description: '500-bed medical college hospital in Natekal offering General Medicine, ENT, Ophthalmology, Dermatology, and Pediatric Care.',
    address: {
      street: 'University Road, Natekal',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575018',
      coordinates: { lat: 12.8050, lng: 74.8820 }
    },
    phone: '+91-824-2202244',
    email: 'kanachurhospital@gmail.com',
    rating: 4.7,
    reviewsCount: 130,
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 15,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2202255'
  },
  {
    name: 'Highland Hospital',
    tagline: 'Personalized Clinical Excellence in Heart of City',
    description: 'Established multi-specialty hospital at Highlands specializing in General Surgery, Pulmonology, Diabetology, and Obstetrics.',
    address: {
      street: 'Highlands, Kankanady',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575002',
      coordinates: { lat: 12.8655, lng: 74.8510 }
    },
    phone: '+91-824-2433222',
    email: 'highlandmgl@gmail.com',
    rating: 4.75,
    reviewsCount: 190,
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 16,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2433225'
  },
  {
    name: 'City Hospital, Mangalore',
    tagline: 'Comprehensive Outpatient & Diagnostic Center',
    description: 'Centrally located hospital at PVS Circle known for ENT, Ophthalmology, Orthopedics, and prompt OPD consultations.',
    address: {
      street: 'PVS Circle, Kodialbail',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575003',
      coordinates: { lat: 12.8730, lng: 74.8425 }
    },
    phone: '+91-824-2440932',
    email: 'cityhospitalmgl@yahoo.com',
    rating: 4.7,
    reviewsCount: 150,
    images: [
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 10,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '08:00 AM - 08:30 PM',
    emergencyPhone: '+91-824-2440935'
  },
  {
    name: 'SCS Hospital',
    tagline: 'Premier Surgical & Gynecological Specialty Center',
    description: 'Renowned hospital in Balmatta focusing on Obstetrics, Gynaecology, Neonatology, Orthopedics, and Laparoscopy.',
    address: {
      street: 'Upper Bendoor, Balmatta',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575002',
      coordinates: { lat: 12.8690, lng: 74.8490 }
    },
    phone: '+91-824-2211044',
    email: 'scshospital@gmail.com',
    rating: 4.8,
    reviewsCount: 210,
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 15,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2211049'
  },
  {
    name: 'Dr. A.V. Baliga Memorial Hospital, Udupi',
    tagline: 'Specialized Psychiatry & Behavioral Sciences Institute',
    description: 'Premier mental health hospital in Udupi providing Psychiatry, Clinical Psychology, Addiction De-addiction, and Neurology care.',
    address: {
      street: 'Doddanagudde',
      city: 'Udupi',
      state: 'Karnataka',
      zipCode: '576102',
      coordinates: { lat: 13.3510, lng: 74.7550 }
    },
    phone: '+91-820-2521992',
    email: 'baligahospital.udupi@gmail.com',
    rating: 4.85,
    reviewsCount: 165,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 12,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '09:00 AM - 07:00 PM',
    emergencyPhone: '+91-820-2521995'
  },
  {
    name: 'Hi-Tech Medicare Hospital, Udupi',
    tagline: 'Modern Diagnostic & Multi-Specialty Center',
    description: 'Multi-specialty hospital near Ambalpady equipped with 24/7 Pharmacy, Laboratory, X-Ray, and OPD clinics.',
    address: {
      street: 'NH 66, Ambalpady Bypass',
      city: 'Udupi',
      state: 'Karnataka',
      zipCode: '576103',
      coordinates: { lat: 13.3310, lng: 74.7380 }
    },
    phone: '+91-820-2535001',
    email: 'hitech.udupi@gmail.com',
    rating: 4.7,
    reviewsCount: 140,
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 10,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-820-2535005'
  },
  {
    name: 'Gandhi Hospital, Udupi',
    tagline: 'Trusted Community Healthcare & Maternity Center',
    description: 'Established hospital near Udupi KSRTC Bus Stand offering General Medicine, Gynecology, Pediatrics, and Dental Surgery.',
    address: {
      street: 'Maruthi Veethika, Near Bus Stand',
      city: 'Udupi',
      state: 'Karnataka',
      zipCode: '576101',
      coordinates: { lat: 13.3400, lng: 74.7430 }
    },
    phone: '+91-820-2520021',
    email: 'gandhihospital.udupi@gmail.com',
    rating: 4.75,
    reviewsCount: 155,
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 14,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '08:00 AM - 08:00 PM',
    emergencyPhone: '+91-820-2520025'
  },
  {
    name: 'Medcure Hospital, Bantwal',
    tagline: 'Leading Multi-Specialty Medical Center in Bantwal',
    description: 'Key healthcare facility serving Bantwal & BC Road region with Emergency Trauma, General Medicine, Orthopedics, and Diagnostics.',
    address: {
      street: 'BC Road Main Junction',
      city: 'Bantwal, DK',
      state: 'Karnataka',
      zipCode: '574219',
      coordinates: { lat: 12.8890, lng: 75.0320 }
    },
    phone: '+91-8255-233400',
    email: 'medcure.bcroad@gmail.com',
    rating: 4.7,
    reviewsCount: 120,
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 10,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-8255-233405'
  },
  {
    name: 'Mahaveera Hospital, Puttur',
    tagline: 'Premier Quaternary Care Center in Puttur',
    description: 'Modern multi-specialty center providing Cardiology, Nephrology, Orthopedics, Pediatrics, and ICU facilities for Puttur region.',
    address: {
      street: 'Main Road, Near Bus Stand',
      city: 'Puttur, DK',
      state: 'Karnataka',
      zipCode: '574201',
      coordinates: { lat: 12.7660, lng: 75.2020 }
    },
    phone: '+91-8251-230555',
    email: 'mahaveerahospital.puttur@gmail.com',
    rating: 4.75,
    reviewsCount: 135,
    images: [
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 12,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-8251-230559'
  },
  {
    name: 'Vinaya Hospital & Research Centre',
    tagline: 'Specialized Neurological & Surgical Institute',
    description: 'Renowned healthcare center in Karangalpady specializing in Neurosurgery, Orthopedics, Critical Care, and Rehabilitation.',
    address: {
      street: 'Karangalpady, Near PVS Circle',
      city: 'Mangalore',
      state: 'Karnataka',
      zipCode: '575003',
      coordinates: { lat: 12.8740, lng: 74.8450 }
    },
    phone: '+91-824-2491544',
    email: 'vinayahospital@gmail.com',
    rating: 4.7,
    reviewsCount: 145,
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 15,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+91-824-2491548'
  },
  {
    name: 'City Center Clinic & Diagnostic, Udupi',
    tagline: 'Advanced Outpatient Diagnostic & Specialist Clinic',
    description: 'State-of-the-art diagnostic clinic in Udupi providing cardiology ECG/Echo, pathology lab, ultrasound, and specialist doctor consultation.',
    address: {
      street: 'Kavi Mudana Marg, Near City Bus Stand',
      city: 'Udupi',
      state: 'Karnataka',
      zipCode: '576101',
      coordinates: { lat: 13.3395, lng: 74.7440 }
    },
    phone: '+91-820-2530111',
    email: 'citycenterclinic.udupi@gmail.com',
    rating: 4.8,
    reviewsCount: 160,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 8,
    isOpen: true,
    emergencyAvailable: false,
    operatingHours: '08:00 AM - 07:30 PM',
    emergencyPhone: '+91-820-2530115'
  }
];

const seedDepartments = [
  { name: 'Cardiology', code: 'CARD', floor: '2nd Floor, Block A', status: 'Moderate', currentPatients: 18, estimatedWaitMinutes: 22 },
  { name: 'Neurology & Neurosurgery', code: 'NEUR', floor: '3rd Floor, Block B', status: 'Normal', currentPatients: 8, estimatedWaitMinutes: 15 },
  { name: 'Orthopedics & Joint Replacement', code: 'ORTH', floor: '1st Floor, Main Wing', status: 'Busy', currentPatients: 24, estimatedWaitMinutes: 30 },
  { name: 'Pediatrics & Neonatology', code: 'PEDI', floor: 'Ground Floor, East Wing', status: 'Normal', currentPatients: 10, estimatedWaitMinutes: 18 },
  { name: 'Dermatology & Cosmetic Skin Care', code: 'DERM', floor: '4th Floor, Suite 402', status: 'Normal', currentPatients: 5, estimatedWaitMinutes: 12 },
  { name: 'General Medicine & Diabetology', code: 'GENM', floor: 'Ground Floor, OPD Lounge', status: 'High Surge', currentPatients: 32, estimatedWaitMinutes: 38 },
  { name: 'Gastroenterology & Hepatology', code: 'GAST', floor: '2nd Floor, Block C', status: 'Normal', currentPatients: 9, estimatedWaitMinutes: 16 },
  { name: 'Oncology & Cancer Care', code: 'ONCO', floor: '5th Floor, Cancer Block', status: 'Normal', currentPatients: 7, estimatedWaitMinutes: 20 },
  { name: 'Nephrology & Urology', code: 'NEPH', floor: '3rd Floor, Dialysis Wing', status: 'Moderate', currentPatients: 14, estimatedWaitMinutes: 24 },
  { name: 'ENT & Head-Neck Surgery', code: 'ENT', floor: '1st Floor, OPD Wing', status: 'Normal', currentPatients: 6, estimatedWaitMinutes: 14 },
  { name: 'Obstetrics & Gynaecology', code: 'GYNA', floor: '2nd Floor, Women Wing', status: 'Normal', currentPatients: 12, estimatedWaitMinutes: 18 },
  { name: 'Psychiatry & Behavioral Health', code: 'PSYC', floor: '4th Floor, Wellness Wing', status: 'Normal', currentPatients: 4, estimatedWaitMinutes: 10 },
  { name: '24/7 Emergency & Trauma', code: 'EMRG', floor: 'Ground Floor, ER Entrance', status: 'Normal', currentPatients: 6, estimatedWaitMinutes: 5 }
];

const seedFacilities = [
  { name: '24/7 Level-1 Trauma & Emergency ICU', category: 'Emergency & Care', status: 'Available', description: 'Fully equipped Intensive Care Unit with dedicated trauma bay' },
  { name: '3 Tesla High-Field MRI & 128-Slice CT', category: 'Diagnostics', status: 'Available', description: 'Ultra-speed neuro imaging & cardiac CT angiography' },
  { name: '24/7 In-House Pharmacy', category: 'Services', status: 'Available', description: 'Complete inventory of critical care & specialty medicines' },
  { name: 'Biplane Cardiac Cath Lab', category: 'Diagnostics', status: 'Available', description: 'Instant primary angioplasty & vascular stent placement' },
  { name: 'NABH Accredited Blood Bank', category: 'Diagnostics', status: 'Available', description: 'Separation of Packed Red Cells, Platelet Concentrate & FFP' },
  { name: 'Da Vinci Robotic Surgery Suite', category: 'Surgical', status: 'Available', description: 'Minimal access robotic surgery for oncology & urology' },
  { name: '24/7 Hemodialysis Unit', category: 'Services', status: 'Available', description: 'Advanced dialysis beds with ultra-pure RO water system' }
];

module.exports = {
  seedHospitals,
  seedDepartments,
  seedFacilities
};
