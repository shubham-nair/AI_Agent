import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons'; 
import { FaLandmark, FaMountain, FaUtensils, FaHiking, FaUmbrellaBeach, FaShoppingBag, FaHistory, FaGlassCheers } from 'react-icons/fa';
import { generateTravelPlan } from '../../services/ai/travelAIService';
import { FormInput } from '../../models/FormInput';
import { Interest } from '../../models/Enums';
import '../../styles/global.css';
import '../../styles/FormPage.css';

interface InterestOption {
  id: Interest;
  icon: IconType;
  label: string;
}

const interestOptions: InterestOption[] = [
  { id: Interest.Culture, icon: FaLandmark, label: 'Culture' },
  { id: Interest.Nature, icon: FaMountain, label: 'Nature' },
  { id: Interest.Food, icon: FaUtensils, label: 'Food' },
  { id: Interest.Adventure, icon: FaHiking, label: 'Adventure' },
  { id: Interest.Relaxation, icon: FaUmbrellaBeach, label: 'Relaxation' },
  { id: Interest.Shopping, icon: FaShoppingBag, label: 'Shopping' },
  { id: Interest.History, icon: FaHistory, label: 'History' },
  { id: Interest.Nightlife, icon: FaGlassCheers, label: 'Nightlife' },
];

const InputForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormInput>({
    destination: '',
    startDate: '',
    endDate: '',
    interests: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const travelPlan = await generateTravelPlan(formData);
      localStorage.setItem('currentTravelPlan', JSON.stringify(travelPlan));
      navigate('/outcome');
    } catch (err) {
      setError('Failed to generate travel plan. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInterestChange = (interest: Interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Plan Your Trip</h1>
          <p>Tell us about your travel preferences and we'll create a personalized itinerary</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="travel-form">
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              placeholder="Enter city, country, or region (e.g., Paris, France or Southeast Asia)"
              required
            />
          </div>

          <div className="date-group">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="interests-header">
              <label>Interests</label>
              <span className="multi-select-hint">Select multiple interests</span>
            </div>
            <div className="interests-grid">
              {interestOptions.map(({ id, icon: Icon, label }) => {
                const IconComponent = Icon as React.ComponentType<{ size?: number; className?: string }>;
                return (
                  <button
                    key={id}
                    type="button"
                    className={`interest-button ${formData.interests.includes(id) ? 'selected' : ''}`}
                    onClick={() => handleInterestChange(id)}
                  >
                    <IconComponent size={24} className="interest-icon" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Generating Itinerary...' : 'Generate Itinerary'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
