import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TravelPlan } from '../../models/TravelPlan';
import { DailyItinerary } from '../../models/DailyItinerary';
import { Activity } from '../../models/Activity';
import { PlanSource } from '../../models/Enums';
import '../../styles/global.css';
import '../../styles/OutcomePage.css';

function OutcomePage() {
  const navigate = useNavigate();
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [error, setError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem('currentTravelPlan');
    if (!storedPlan) {
      setError('No travel plan found. Please create a new plan.');
      return;
    }

    try {
      const plan = JSON.parse(storedPlan);
      setTravelPlan(plan);
    } catch (err) {
      setError('Error loading travel plan. Please try again.');
      console.error('Error parsing travel plan:', err);
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSavePlan = () => {
    if (!travelPlan) return;

    setIsSaving(true);
    try {
      // Get existing saved plans
      const savedPlansData = localStorage.getItem('savedPlans');
      const savedPlans: TravelPlan[] = savedPlansData ? JSON.parse(savedPlansData) : [];

      // Create a new plan with generated source
      const planToSave: TravelPlan = {
        ...travelPlan,
        id: `plan-${Date.now()}`,
        source: PlanSource.Generated,
        createdAt: new Date().toISOString(),
        isEditable: true
      };

      // Add the new plan to saved plans
      savedPlans.push(planToSave);
      localStorage.setItem('savedPlans', JSON.stringify(savedPlans));

      // Navigate to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error saving plan:', error);
      setError('Failed to save plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return (
      <div className="outcome-page">
        <div className="outcome-container">
          <div className="error-message">
            {error}
            <button onClick={() => navigate('/form')} className="retry-button">
              Create New Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!travelPlan) {
    return (
      <div className="outcome-page">
        <div className="outcome-container">
          <div className="loading">Loading your travel plan...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="outcome-page">
      <div className="outcome-container">
        <header className="outcome-header">
          <h1>{travelPlan.title}</h1>
          <p className="dates">
            {formatDate(travelPlan.preference.startDate)} - {formatDate(travelPlan.preference.endDate)}
          </p>
        </header>

        <div className="itinerary-container">
          {travelPlan.plan.map((day: DailyItinerary, index: number) => (
            <div key={day.date} className="day-card">
              <div className="day-header">
                <h2>Day {index + 1}</h2>
                <div className="day-info">
                  <span className="date">{formatDate(day.date)}</span>
                  {day.weather && <span className="weather">{day.weather}</span>}
                </div>
              </div>

              <div className="activities">
                {day.activities.map((activity: Activity, actIndex: number) => (
                  <div key={actIndex} className="activity-card">
                    {activity.time && <div className="activity-time">{activity.time}</div>}
                    <div className="activity-content">
                      <h3>{activity.title}</h3>
                      {activity.notes && <p className="description">{activity.notes}</p>}
                      {activity.location && <p className="location">{activity.location}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {day.notes && (
                <div className="day-notes">
                  <h4>Notes</h4>
                  <p>{day.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/form')} className="secondary-button">
            Create New Plan
          </button>
          <button onClick={handleSavePlan} className="primary-button" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save to My Plans'}
          </button>
          <button onClick={() => window.print()} className="primary-button">
            Print Itinerary
          </button>
        </div>
      </div>
    </div>
  );
}

export default OutcomePage;
