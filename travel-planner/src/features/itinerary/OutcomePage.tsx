import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TravelPlan } from '../../models/TravelPlan';
import { DailyItinerary } from '../../models/DailyItinerary';
import { Activity } from '../../models/Activity';
import '../../styles/global.css';

function OutcomePage() {
  const navigate = useNavigate();
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [error, setError] = useState<string>('');

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

  if (error) {
    return (
      <div className="outcome-container">
        <div className="error-message">
          {error}
          <button onClick={() => navigate('/form')} className="retry-button">
            Create New Plan
          </button>
        </div>
      </div>
    );
  }

  if (!travelPlan) {
    return (
      <div className="outcome-container">
        <div className="loading">Loading your travel plan...</div>
      </div>
    );
  }

  return (
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
        <button onClick={() => window.print()} className="primary-button">
          Print Itinerary
        </button>
      </div>
    </div>
  );
}

export default OutcomePage;
