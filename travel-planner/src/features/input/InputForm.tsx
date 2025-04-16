import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Interest } from '../../models/Enums';
import { FormInput } from '../../models/FormInput';

function InputForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormInput>({
    destination: '',
    startDate: '',
    endDate: '',
    interests: [],
  });

  const allInterests = Object.values(Interest);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value as Interest]
        : prev.interests.filter(i => i !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    navigate('/outcome'); // TODO: pass data via context or API
  };

  return (
    <div>
      <h2>Plan Your Trip</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Destination:</label><br />
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Start Date:</label><br />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date:</label><br />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Interests:</label><br />
          {allInterests.map(interest => (
            <label key={interest}>
              <input
                type="checkbox"
                value={interest}
                checked={formData.interests.includes(interest)}
                onChange={handleCheckboxChange}
              />
              {interest}
            </label>
          ))}
        </div>

        <br />
        <button type="submit">Generate Itinerary</button>
      </form>
    </div>
  );
}

export default InputForm;
