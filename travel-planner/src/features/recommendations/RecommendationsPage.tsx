import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RecommendationsPage.css';

interface Destination {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: { text: string; type: string }[];
  rating: number;
  duration: string;
}

const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [destinations] = useState<Destination[]>([
    {
      id: '1',
      title: 'Romantic Paris Getaway',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Explore the romance and art of Paris, from the Eiffel Tower to the Louvre, experiencing the elegance and sophistication of French life.',
      tags: [
        { text: 'Romantic', type: 'romantic' },
        { text: 'Art', type: 'art' },
        { text: 'Cuisine', type: 'cuisine' }
      ],
      rating: 4.8,
      duration: '5 Days 4 Nights'
    },
    {
      id: '2',
      title: 'Tokyo Urban Exploration',
      image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Experience the blend of modern and traditional in Tokyo, from the bustling Shibuya to the serene Sensoji Temple, discovering the unique charm of Japanese culture.',
      tags: [
        { text: 'Urban', type: 'urban' },
        { text: 'Culture', type: 'culture' },
        { text: 'Shopping', type: 'shopping' }
      ],
      rating: 4.7,
      duration: '6 Days 5 Nights'
    },
    {
      id: '3',
      title: 'Maldives Island Retreat',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Relax in the crystal-clear waters of the Maldives, enjoying luxurious overwater villas and abundant marine activities.',
      tags: [
        { text: 'Island', type: 'island' },
        { text: 'Resort', type: 'resort' },
        { text: 'Diving', type: 'diving' }
      ],
      rating: 4.9,
      duration: '7 Days 6 Nights'
    }
  ]);

  const handleDestinationClick = (id: string) => {
    navigate(`/recommendations/${id}`);
  };

  return (
    <div className="recommendations-page">
      <div className="recommendations-container">
        <div className="recommendations-header">
          <h1>Featured Destinations</h1>
          <p>Explore amazing destinations around the world and find your perfect trip</p>
        </div>
        
        <div className="recommendations-grid">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="destination-card"
              onClick={() => handleDestinationClick(destination.id)}
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="destination-image"
              />
              <div className="destination-content">
                <h2 className="destination-title">{destination.title}</h2>
                <p className="destination-description">{destination.description}</p>
                
                <div className="destination-tags">
                  {destination.tags.map((tag, index) => (
                    <span key={index} className="tag" data-type={tag.type}>
                      {tag.text}
                    </span>
                  ))}
                </div>
                
                <div className="destination-meta">
                  <div className="destination-rating">
                    <i className="fas fa-star"></i>
                    <span>{destination.rating}</span>
                  </div>
                  <div className="destination-duration">
                    {destination.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage; 