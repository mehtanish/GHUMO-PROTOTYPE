import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { PublicLayout } from './layouts/PublicLayout';
import { AppLayout } from './layouts/AppLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { ExploreIndia } from './pages/ExploreIndia';
import { PlanTrip } from './pages/PlanTrip';
import { MyTrips } from './pages/MyTrips';
import { AskLocal } from './pages/AskLocal';
import { AIAssistant } from './pages/AIAssistant';
import { StudentGuides } from './pages/StudentGuides';
import { Passport } from './pages/Passport';
import { ImpactScore } from './pages/ImpactScore';
import { FairPrice } from './pages/FairPrice';
import { Hotels } from './pages/Hotels';
import { Profile } from './pages/Profile';
import { GuideLogin } from './pages/GuideLogin';
import { GuidePortal } from './pages/GuidePortal';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthContext();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/guide-login" element={<GuideLogin />} />
        </Route>

        {/* Dedicated Guide Portal Route */}
        <Route path="/guide-portal" element={<GuidePortal />} />

        {/* Protected App Routes */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="explore" element={<ExploreIndia />} />
          <Route path="plan" element={<PlanTrip />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="ask-local" element={<AskLocal />} />
          <Route path="guides" element={<StudentGuides />} />
          <Route path="fair-price" element={<FairPrice />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="trips" element={<MyTrips />} />
          <Route path="passport" element={<Passport />} />
          <Route path="impact" element={<ImpactScore />} />
          <Route path="profile" element={<Profile />} />
          {/* Fallback to profile for settings and saved for now */}
          <Route path="settings" element={<Profile />} />
          <Route path="saved" element={<ExploreIndia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
