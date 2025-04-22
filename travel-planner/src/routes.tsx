import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import InputForm from './features/input/InputForm';
import OutcomePage from './features/itinerary/OutcomePage';
import PlanEditor from './features/itinerary/PlanEditor';
import ProfileDashboard from './features/profile/ProfileDashboard';
import RecommendationsPage from './features/recommendations/RecommendationsPage';
import RecommendationDetail from './features/recommendations/RecommendationDetail';
import LoginPage from './auth/LoginPage';
import { useAuth } from './auth/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/form" element={<InputForm />} />
      <Route path="/outcome" element={<OutcomePage />} />
      <Route path="/plan/:id/edit" element={<PlanEditor />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfileDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      <Route path="/recommendations/:id" element={<RecommendationDetail />} />
    </Routes>
  );
}

export default AppRoutes;
