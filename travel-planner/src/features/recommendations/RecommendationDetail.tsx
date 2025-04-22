import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faRegStar, faBookmark as faRegBookmark } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar, faBookmark as faSolidBookmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TravelPlan } from '../../models/TravelPlan';
import { PlanSource, Interest } from '../../models/Enums';
import '../../styles/RecommendationsPage.css';

interface Destination {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
  rating: number;
  duration: string;
  details: {
    overview: string;
    highlights: string[];
    itinerary: {
      day: number;
      activities: string[];
    }[];
    tips: string[];
  };
}

const RecommendationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuth();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data fetching
    const fetchDestination = async () => {
      try {
        const mockData: Destination = {
          id: id || '',
          title: 'Romantic Paris Getaway',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'Explore the romance and art of Paris, from the Eiffel Tower to the Louvre, experiencing the elegance and sophistication of French life.',
          tags: ['Romantic', 'Art', 'Cuisine'],
          rating: 4.8,
          duration: '5 Days 4 Nights',
          details: {
            overview: 'Paris, the city of romance, is renowned for its unique artistic atmosphere and culinary culture. Here, you can stroll along the Seine River, admire the grandeur of the Eiffel Tower, explore the art treasures of the Louvre, and savor authentic French cuisine.',
            highlights: [
              'Eiffel Tower Night View',
              'Louvre Art Tour',
              'Seine River Cruise',
              'Montmartre Art District',
              'Champs-Élysées Shopping'
            ],
            itinerary: [
              {
                day: 1,
                activities: [
                  'Arrive in Paris, check-in to hotel',
                  'Eiffel Tower visit',
                  'Dinner cruise on the Seine'
                ]
              },
              {
                day: 2,
                activities: [
                  'Louvre Museum tour',
                  'Tuileries Garden walk',
                  'Shopping on Champs-Élysées'
                ]
              }
            ],
            tips: [
              'Book popular attraction tickets in advance',
              'Learn basic French greetings',
              'Bring comfortable walking shoes',
              'Keep personal belongings secure'
            ]
          }
        };
        setDestination(mockData);
        
        // Check if this plan is already saved
        const savedPlans = JSON.parse(localStorage.getItem('savedPlans') || '[]');
        const isPlanSaved = savedPlans.some((plan: TravelPlan) => plan.id === id);
        setIsSaved(isPlanSaved);
      } catch (error) {
        console.error('Error fetching destination:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const handleSave = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!destination) return;

    const travelPlan: TravelPlan = {
      id: destination.id,
      title: destination.title,
      preference: {
        destination: 'Paris', // This should be extracted from the destination
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        interests: [Interest.Culture, Interest.Food] // This should be extracted from the destination
      },
      plan: destination.details.itinerary.map(day => ({
        date: new Date(Date.now() + (day.day - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        activities: day.activities.map(activity => ({
          title: activity,
          time: '',
          location: '',
          notes: ''
        })),
        notes: ''
      })),
      createdAt: new Date().toISOString(),
      isEditable: true,
      source: PlanSource.Recommendation
    };

    // Save to localStorage for now
    const savedPlans = JSON.parse(localStorage.getItem('savedPlans') || '[]');
    if (isSaved) {
      const updatedPlans = savedPlans.filter((plan: TravelPlan) => plan.id !== travelPlan.id);
      localStorage.setItem('savedPlans', JSON.stringify(updatedPlans));
    } else {
      localStorage.setItem('savedPlans', JSON.stringify([...savedPlans, travelPlan]));
    }

    setIsSaved(!isSaved);
  };

  if (isLoading) {
    return <div className="recommendations-page">Loading...</div>;
  }

  if (!destination) {
    return <div className="recommendations-page">Destination not found</div>;
  }

  return (
    <div className="recommendations-page">
      <div className="recommendations-container">
        <div className="destination-detail">
          <div className="destination-header">
            <button 
              className="back-button"
              onClick={() => navigate('/recommendations')}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Recommendations
            </button>

            <h1>{destination.title}</h1>
            <div className="destination-meta">
              <div className="destination-rating">
                {[...Array(5)].map((_, i) => (
                  i < Math.floor(destination.rating) ? 
                    <FontAwesomeIcon key={i} icon={faSolidStar} className="star-icon" /> : 
                    <FontAwesomeIcon key={i} icon={faRegStar} className="star-icon" />
                ))}
                <span>{destination.rating}</span>
              </div>
              <div className="destination-duration">
                {destination.duration}
              </div>
              <button 
                className={`save-button ${isSaved ? 'saved' : ''}`}
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={isSaved ? faSolidBookmark : faRegBookmark} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <div className="destination-image-container">
            <img 
              src={destination.image} 
              alt={destination.title}
              className="destination-image"
            />
          </div>

          <div className="destination-content">
            <div className="destination-description">
              <h2>Overview</h2>
              <p>{destination.details.overview}</p>
            </div>

            <div className="destination-highlights">
              <h2>Highlights</h2>
              <ul>
                {destination.details.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="destination-itinerary">
              <h2>Itinerary</h2>
              {destination.details.itinerary.map((day, index) => (
                <div key={index} className="day-plan">
                  <h3>Day {day.day}</h3>
                  <ul>
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="destination-tips">
              <h2>Travel Tips</h2>
              <ul>
                {destination.details.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetail; 