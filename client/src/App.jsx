import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { HospitalAdminDashboard } from './pages/HospitalAdminDashboard';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { HospitalsPage } from './pages/HospitalsPage';
import { HospitalDetailsPage } from './pages/HospitalDetailsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailsPage } from './pages/DoctorDetailsPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { SmartPlannerPage } from './pages/SmartPlannerPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Route Guard
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center py-20 text-slate-400">Loading session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
              <Navbar />
              <main className="flex-1 pb-16 md:pb-0">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/hospitals" element={<HospitalsPage />} />
                  <Route path="/hospitals/:id" element={<HospitalDetailsPage />} />
                  <Route path="/doctors" element={<DoctorsPage />} />
                  <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
                  <Route path="/book-appointment" element={<BookAppointmentPage />} />
                  <Route path="/planner" element={<SmartPlannerPage />} />
                  <Route path="/emergency" element={<EmergencyPage />} />

                  {/* Protected Role-Based Dashboard Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['PATIENT']}>
                        <PatientDashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/doctor-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['DOCTOR']}>
                        <DoctorDashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/hospital-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['HOSPITAL_ADMIN']}>
                        <HospitalAdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/super-admin"
                    element={
                      <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                        <SuperAdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <MobileBottomNav />
            </div>
          </Router>
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
