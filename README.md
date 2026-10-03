# 🏥 MediFlow — Healthcare, Without The Waiting

> **Live Patient Flow Intelligence & Hospital Queue Management Platform**

MediFlow is a production-grade, full-stack MERN healthcare application engineered to eliminate hospital waiting room anxiety. It combines real-time patient queue intelligence, instant estimated wait time calculations, hospital and doctor discovery, digital token generation, and role-based administration portals.

---

## 🌟 Key Features

1. **Live Patient Flow Intelligence Engine**: Real-time Socket.IO integration broadcasting live token status (`A-27`, `A-28`) and estimated wait times to patients without requiring page refreshes.
2. **"When Should I Go?" Smart Visit Planner**: Predictive department crowd density model leveraging historical queue data to highlight optimal low-crowd visit hours (e.g., 2 PM quiet hours).
3. **Marketplace Hospital & Doctor Discovery**: Comprehensive search and multi-parameter filtering by specialty, location, consultation fee, emergency availability, and current surge levels.
4. **Conflict-Free Appointment Engine**: Strict database-level slot validation ensuring zero double-bookings per doctor.
5. **Digital Token & Queue Check-in**: One-touch digital check-in generating printable/downloadable digital queue passes with real-time progress indicators.
6. **Doctor OPD Queue Console**: Professional doctor interface with quick queue controls: `CALL NEXT`, `START CONSULTATION`, `COMPLETE`, `SKIP`, `NO-SHOW`, and `PAUSE QUEUE`.
7. **Hospital Administration & Recharts Analytics**: Interactive analytics dashboard presenting daily appointment volume, department utilization distribution, and wait-time trends.
8. **Super Admin Platform Control**: Verify hospital network partners, inspect platform metrics, and manage user roles.
9. **Emergency Response Information**: 24/7 ER availability listings, ambulance hotlines, and medical disclaimers.

---

## 🔑 Demo Login Credentials

You can test all four role-based experiences using pre-configured demo credentials or the **One-Click Demo Buttons** on the login page:

| Role | Email | Password | Access & Capabilities |
| :--- | :--- | :--- | :--- |
| **Patient** | `patient@mediflow.com` | `Password123!` | Book appointments, digital token check-in, live queue tracking, past visit history |
| **Doctor** | `doctor.ananya@mediflow.com` | `Password123!` | Live OPD queue console, call next patient, start/complete consultations |
| **Hospital Admin** | `admin.citycare@mediflow.com` | `Password123!` | Live surge meter controls, department metrics, Recharts analytics |
| **Super Admin** | `superadmin@mediflow.com` | `Password123!` | System-wide statistics, verify hospital partners, platform controls |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide React, Axios, Socket.IO Client, Context API.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose ORM), JWT Authentication, bcryptjs, Socket.IO, Multer.
- **Database**: MongoDB (Supports local MongoDB server, MongoDB Atlas, and automatic in-memory MongoDB fallback for instant zero-config dev setup).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Repository Setup & Dependencies
```bash
# Clone repository & navigate to project directory
cd Arogya

# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Running Seed Data (Optional)
To seed the database with 5+ realistic hospitals, 15+ doctors, departments, facilities, initial appointments, and reviews:
```bash
cd server
npm run seed
```

### 3. Launching Development Servers

**Start Server**:
```bash
cd server
npm run dev
# Starts backend server at http://localhost:5000
```

**Start Client**:
```bash
cd client
npm run dev
# Starts Vite frontend at http://localhost:3000
```

---

## 📡 REST API Overview

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Public | Register new user account with role selection |
| `/api/auth/login` | `POST` | Public | Authenticate user & issue JWT token |
| `/api/auth/me` | `GET` | Private | Fetch logged-in user profile |
| `/api/hospitals` | `GET` | Public | Search & filter hospitals by name, crowd, city |
| `/api/hospitals/:id` | `GET` | Public | Get hospital profile with doctors, departments & facilities |
| `/api/doctors` | `GET` | Public | Filter doctors by specialty, hospital, fee, availability |
| `/api/doctors/:id/slots` | `GET` | Public | Fetch available & booked slots for doctor on date |
| `/api/departments/:id/planner` | `GET` | Public | Fetch hourly crowd density forecast for Smart Planner |
| `/api/appointments` | `POST` | Private | Book new appointment with conflict check |
| `/api/appointments/:id/check-in` | `POST` | Private | Digital check-in & issue live queue token |
| `/api/queues/:id/action` | `POST` | Doctor | Handle queue actions: CALL_NEXT, START, COMPLETE, SKIP |
| `/api/analytics` | `GET` | Admin | Fetch Recharts analytics & summary KPI metrics |

---

## 🛡️ License

MediFlow is released under the **MIT License**.
