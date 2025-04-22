import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { TravelPlan } from '../../models/TravelPlan';
import { PlanSource } from '../../models/Enums';
import '../../styles/global.css';
import '../../styles/ProfilePage.css';

function ProfileDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [savedPlans, setSavedPlans] = useState<TravelPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'saved' | 'generated'>('all');

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

  const getTravelStats = () => {
    const savedPlansCount = savedPlans.filter((plan: TravelPlan) => 
      plan.source === PlanSource.Recommendation
    ).length;
    const generatedPlansCount = savedPlans.filter((plan: TravelPlan) => 
      plan.source === PlanSource.Generated
    ).length;

    return {
      totalPlans: savedPlans.length,
      savedPlans: savedPlansCount,
      generatedPlans: generatedPlansCount
    };
  };

  const filteredPlans = selectedFilter === 'all' 
    ? savedPlans 
    : selectedFilter === 'saved'
    ? savedPlans.filter(plan => plan.source === PlanSource.Recommendation)
    : savedPlans.filter(plan => plan.source === PlanSource.Generated);

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

  const stats = getTravelStats();

  const getPlanTypeLabel = (source: PlanSource) => {
    switch (source) {
      case PlanSource.Recommendation:
        return 'Saved Plan';
      case PlanSource.Generated:
        return 'Generated Plan';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="user-info">
            <div className="user-avatar">
              {auth.user.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="profile-title">Welcome, {auth.user.email}</h1>
              <p className="user-email">{auth.user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => auth.logout()}
            className="sign-out-button"
          >
            Sign Out
          </button>
        </div>

        <div className="travel-stats">
          <div className="stat-card">
            <h3>Total Plans</h3>
            <p className="stat-number">{stats.totalPlans}</p>
          </div>
          <div className="stat-card">
            <h3>Saved Plans</h3>
            <p className="stat-number">{stats.savedPlans}</p>
          </div>
          <div className="stat-card">
            <h3>Generated Plans</h3>
            <p className="stat-number">{stats.generatedPlans}</p>
          </div>
        </div>

        <div className="filter-section">
          <h2>My Plans</h2>
          <div className="filter-options">
            <button 
              className={`filter-button ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Plans
            </button>
            <button
              className={`filter-button ${selectedFilter === 'saved' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('saved')}
            >
              Saved Plans
            </button>
            <button
              className={`filter-button ${selectedFilter === 'generated' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('generated')}
            >
              Generated Plans
            </button>
          </div>
        </div>

        {filteredPlans.length === 0 ? (
          <div className="empty-state">
            <p>No plans found for this filter.</p>
            <button 
              onClick={() => navigate('/recommendations')}
              className="primary-button"
              type="button"
            >
              Explore Recommendations
            </button>
          </div>
        ) : (
          <div className="plans-grid">
            {filteredPlans.map(plan => (
              <div key={plan.id} className="plan-card">
                <h3>{plan.title}</h3>
                <p className="destination">📍 {plan.preference.destination}</p>
                <p className="dates">📅 {plan.preference.startDate} - {plan.preference.endDate}</p>
                <p className="interests">🎯 {plan.preference.interests.join(', ')}</p>
                <p className="source">{getPlanTypeLabel(plan.source)}</p>
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
            <div 
              className="plan-card create-new-card"
              onClick={() => navigate('/form')}
            >
              <div className="create-new-content">
                <h3>Create New Trip</h3>
                <p>Start planning your next adventure</p>
                <button className="primary-button">
                  Create Trip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDashboard;
