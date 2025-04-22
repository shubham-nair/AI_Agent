import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import InputForm from './features/input/InputForm';
import OutcomePage from './features/itinerary/OutcomePage';
import PlanEditor from './features/itinerary/PlanEditor';
import ProfileDashboard from './features/profile/ProfileDashboard';
import RecommendationsPage from './features/recommendations/RecommendationsPage';
import RecommendationDetail from './features/recommendations/RecommendationDetail';
import LoginPage from './auth/LoginPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/form" element={<InputForm />} />
      <Route path="/outcome" element={<OutcomePage />} />
      <Route path="/plan/:id/edit" element={<PlanEditor />} />
      <Route path="/profile" element={<ProfileDashboard />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      <Route path="/recommendations/:id" element={<RecommendationDetail />} />
    </Routes>
  );
}

export default AppRoutes;
