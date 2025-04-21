import { FormInput } from '../../models/FormInput';
import { TravelPlan } from '../../models/TravelPlan';
import { PlanSource } from '../../models/Enums';

// Mock data generator for local testing
export async function generateTravelPlan(input: FormInput): Promise<TravelPlan> {
  console.log('Generating mock travel plan for:', input);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Calculate dates between start and end dates
  const startDate = new Date(input.startDate);
  const endDate = new Date(input.endDate);
  const dayDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Generate mock days
  const days = [];
  for (let i = 0; i < dayDiff; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    days.push({
      date: date.toISOString().split('T')[0],
      weather: getRandomWeather(),
      activities: generateActivities(input.interests, 3),
      notes: `Enjoy your day in ${input.destination}!`
    });
  }

  return {
    id: 'mock-' + Date.now(),
    title: `Trip to ${input.destination}`,
    preference: input,
    plan: days,
    createdAt: new Date().toISOString(),
    isEditable: true,
    source: PlanSource.Generated
  };
}

// Helper functions for mock data
function getRandomWeather() {
  const weathers = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Clear Skies'];
  return weathers[Math.floor(Math.random() * weathers.length)];
}

function generateActivities(interests: any[], count: number) {
  const activities = [
    {
      title: 'Visit Local Museum',
      time: '10:00 AM',
      location: 'Central Museum',
      notes: 'Explore the local history and culture through fascinating exhibits.'
    },
    {
      title: 'Lunch at Famous Restaurant',
      time: '1:00 PM',
      location: 'Downtown Restaurant',
      notes: 'Enjoy local cuisine and specialties.'
    },
    {
      title: 'Explore City Center',
      time: '3:00 PM',
      location: 'Main Square',
      notes: 'Walk around the historic city center and enjoy the architecture.'
    },
    {
      title: 'Sunset at Viewpoint',
      time: '6:30 PM',
      location: 'Hilltop Viewpoint',
      notes: 'Watch the beautiful sunset over the city.'
    },
    {
      title: 'Dinner and Entertainment',
      time: '8:00 PM',
      location: 'Entertainment District',
      notes: 'Enjoy local food and entertainment venues.'
    }
  ];
  
  // Shuffle and return a subset
  return shuffleArray(activities).slice(0, count);
}

function shuffleArray(array: any[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
} 