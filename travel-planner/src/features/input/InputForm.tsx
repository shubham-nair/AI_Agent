import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';
import { FaLandmark, FaMountain, FaUtensils, FaHiking, FaUmbrellaBeach, FaShoppingBag, FaHistory, FaGlassCheers } from 'react-icons/fa';

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  interests: string[];
}

interface InterestOption {
  id: string;
  icon: IconType;
  label: string;
}

const interestOptions: InterestOption[] = [
  { id: 'Culture', icon: FaLandmark, label: 'Culture' },
  { id: 'Nature', icon: FaMountain, label: 'Nature' },
  { id: 'Food', icon: FaUtensils, label: 'Food' },
  { id: 'Adventure', icon: FaHiking, label: 'Adventure' },
  { id: 'Relaxation', icon: FaUmbrellaBeach, label: 'Relaxation' },
  { id: 'Shopping', icon: FaShoppingBag, label: 'Shopping' },
  { id: 'History', icon: FaHistory, label: 'History' },
  { id: 'Nightlife', icon: FaGlassCheers, label: 'Nightlife' },
];

const InputForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    startDate: '',
    endDate: '',
    interests: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    navigate('/outcome');
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Plan Your Trip</h1>
        <p>Tell us about your travel preferences and we'll create a personalized itinerary</p>
      </div>
      
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

        <button type="submit" className="submit-button">
          Generate Itinerary
        </button>
      </form>
    </div>
  );
};

export default InputForm;
