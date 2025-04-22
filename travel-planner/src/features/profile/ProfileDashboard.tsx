import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { TravelPlan } from '../../models/TravelPlan';
import { Interest } from '../../models/Enums';
import { PlanSource } from '../../models/Enums';
import '../../styles/global.css';
import '../../styles/ProfilePage.css';

function ProfileDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [savedPlans, setSavedPlans] = useState<TravelPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is not logged in
    if (!auth.user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // Load saved plans from localStorage
    const loadSavedPlans = () => {
      try {
        const savedPlansData = localStorage.getItem('savedPlans');
        if (savedPlansData) {
          const plans = JSON.parse(savedPlansData);
          setSavedPlans(plans);
        }
      } catch (error) {
        console.error('Error loading saved plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedPlans();
  }, [auth.user, navigate, location]);

  if (!auth.user) {
    return null; // Will redirect to login
  }

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading">Loading your plans...</div>
        </div>
      </div>
    );
  }

  if (savedPlans.length === 0) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <h2>My Saved Plans</h2>
          <div className="empty-state">
            <p>You haven't saved any plans yet.</p>
            <button 
              onClick={() => navigate('/recommendations')}
              className="primary-button"
              type="button"
            >
              Explore Recommendations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>My Saved Plans</h2>
        <div className="plans-grid">
          {savedPlans.map(plan => (
            <div key={plan.id} className="plan-card">
              <h3>{plan.title}</h3>
              <p>Destination: {plan.preference.destination}</p>
              <p>Dates: {plan.preference.startDate} - {plan.preference.endDate}</p>
              <div className="plan-actions">
                <button 
                  onClick={() => navigate(`/outcome?planId=${plan.id}`)}
                  className="primary-button"
                  type="button"
                >
                  View Details
                </button>
                <button 
                  onClick={() => navigate(`/plan/${plan.id}/edit`)}
                  className="secondary-button"
                  type="button"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;
