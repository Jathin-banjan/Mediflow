const seedHospitals = [
  {
    name: 'City Care Super Specialty Hospital',
    tagline: 'Leading Tertiary Care & Live Patient Flow Center',
    description: 'State-of-the-art 500-bed super specialty hospital offering 24/7 trauma, cardiology, neurology, and advanced outpatient care.',
    address: {
      street: '104 Healthcare Boulevard, Sector 62',
      city: 'Metro City',
      state: 'NY',
      zipCode: '10001',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    phone: '+1-800-CITY-CARE',
    email: 'info@citycarehospital.com',
    rating: 4.9,
    reviewsCount: 342,
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 28,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+1-800-999-EMERGENCY'
  },
  {
    name: 'Metro Health Institute',
    tagline: 'Precision Diagnostics & Rapid Consultation',
    description: 'A modern medical complex specializing in Cardiology, Orthopedics, and Minimal Access Surgery with real-time patient queue tracking.',
    address: {
      street: '45 Park Avenue, Central District',
      city: 'Metro City',
      state: 'NY',
      zipCode: '10016',
      coordinates: { lat: 40.7484, lng: -73.9857 }
    },
    phone: '+1-800-METRO-MED',
    email: 'contact@metrohealth.org',
    rating: 4.8,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 14,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '07:00 AM - 11:00 PM',
    emergencyPhone: '+1-800-METRO-EMG'
  },
  {
    name: 'Apex Children & Family Clinic',
    tagline: 'Compassionate Care for Children & Families',
    description: 'Dedicated pediatric and family healthcare center with child-friendly waiting lounges and streamlined appointment flow.',
    address: {
      street: '12 Sunshine Drive, Westside',
      city: 'Metro City',
      state: 'NY',
      zipCode: '10023',
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    phone: '+1-800-APEX-KIDS',
    email: 'care@apexchildren.com',
    rating: 4.9,
    reviewsCount: 180,
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Medium',
    estimatedWaitMinutes: 20,
    isOpen: true,
    emergencyAvailable: false,
    operatingHours: '08:00 AM - 08:00 PM',
    emergencyPhone: '+1-800-APEX-URG'
  },
  {
    name: 'St. Jude Heart & Vascular Center',
    tagline: 'Excellence in Cardiovascular Medicine',
    description: 'World-renowned cardiovascular institute equipped with cath labs, non-invasive imaging, and cardiac rehabilitation suites.',
    address: {
      street: '88 Cardiac Way, Medical Ridge',
      city: 'Metro City',
      state: 'NY',
      zipCode: '10029',
      coordinates: { lat: 40.7903, lng: -73.9515 }
    },
    phone: '+1-800-STJUDE-HEART',
    email: 'heart@stjudehealth.org',
    rating: 4.95,
    reviewsCount: 410,
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'High',
    estimatedWaitMinutes: 38,
    isOpen: true,
    emergencyAvailable: true,
    operatingHours: '24/7 Open',
    emergencyPhone: '+1-800-HEART-911'
  },
  {
    name: 'Horizon Dermatology & Wellness Center',
    tagline: 'Advanced Clinical & Cosmetic Skin Care',
    description: 'Boutique clinic focusing on dermatological health, laser therapy, and preventive skin cancer screenings with zero queue friction.',
    address: {
      street: '500 Fifth Avenue, Suite 1200',
      city: 'Metro City',
      state: 'NY',
      zipCode: '10036',
      coordinates: { lat: 40.7537, lng: -73.9818 }
    },
    phone: '+1-800-HORIZON-SKIN',
    email: 'welcome@horizonderm.com',
    rating: 4.75,
    reviewsCount: 128,
    images: [
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80'
    ],
    currentCrowdLevel: 'Low',
    estimatedWaitMinutes: 10,
    isOpen: true,
    emergencyAvailable: false,
    operatingHours: '09:00 AM - 06:00 PM',
    emergencyPhone: '+1-800-HORIZON-SKIN'
  }
];

const seedDepartments = [
  { name: 'Cardiology', code: 'CARD', floor: '2nd Floor, Block A', status: 'Moderate', currentPatients: 18, estimatedWaitMinutes: 28 },
  { name: 'Neurology', code: 'NEUR', floor: '3rd Floor, Block B', status: 'Normal', currentPatients: 8, estimatedWaitMinutes: 15 },
  { name: 'Orthopedics', code: 'ORTH', floor: '1st Floor, Main Wing', status: 'Busy', currentPatients: 24, estimatedWaitMinutes: 35 },
  { name: 'Pediatrics', code: 'PEDI', floor: 'Ground Floor, East Wing', status: 'Normal', currentPatients: 10, estimatedWaitMinutes: 18 },
  { name: 'Dermatology', code: 'DERM', floor: '4th Floor, Suite 402', status: 'Normal', currentPatients: 5, estimatedWaitMinutes: 12 },
  { name: 'General Medicine', code: 'GENM', floor: 'Ground Floor, OPD Lounge', status: 'High Surge', currentPatients: 32, estimatedWaitMinutes: 42 },
  { name: 'Emergency & Trauma', code: 'EMRG', floor: 'Ground Floor, ER Entrance', status: 'Normal', currentPatients: 6, estimatedWaitMinutes: 5 }
];

const seedFacilities = [
  { name: '24/7 Emergency & ICU', category: 'Emergency & Care', status: 'Available', description: 'Fully equipped 40-bed Intensive Care Unit' },
  { name: 'Digital X-Ray & MRI Center', category: 'Diagnostics', status: 'Available', description: '3 Tesla High-Field MRI & Ultra-Speed 128-Slice CT' },
  { name: 'In-House 24/7 Pharmacy', category: 'Services', status: 'Available', description: 'Complete inventory of critical medicines & surgicals' },
  { name: 'Robotic Surgery Suite', category: 'Surgical', status: 'Available', description: 'Da Vinci Xi Robotic Assisted Surgery system' },
  { name: 'Blood Bank & Component Lab', category: 'Diagnostics', status: 'Available', description: 'Separation of Red Blood Cells, Platelets, and FFP' },
  { name: 'Cardiac Cath Lab', category: 'Diagnostics', status: 'Available', description: 'Biplane Cath Lab for instant angioplasty' },
  { name: 'Cafeteria & Lounge', category: 'Amenities', status: 'Available', description: 'Nutritious meals & quiet waiting zones' }
];

module.exports = {
  seedHospitals,
  seedDepartments,
  seedFacilities
};
