import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import InputForm from './features/input/InputForm';
import OutcomePage from './features/itinerary/OutcomePage';
import PlanEditor from './features/itinerary/PlanEditor';
import ProfileDashboard from './features/profile/ProfileDashboard';
import Recommendations from './features/recommendation/Recommendations';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form" element={<InputForm />} />
      <Route path="/outcome" element={<OutcomePage />} />
      <Route path="/plan/:id/edit" element={<PlanEditor />} />
      <Route path="/profile" element={<ProfileDashboard />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default AppRoutes;
