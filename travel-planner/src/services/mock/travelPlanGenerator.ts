import { TravelPlan } from '../../models/TravelPlan';
import { FormInput } from '../../models/FormInput';
import { PlanSource } from '../../models/Enums';

export function generateMockTravelPlan(input: FormInput): TravelPlan {
  const plan = [];

  const dateStart = new Date(input.startDate);
  const dateEnd = new Date(input.endDate);
  const dayCount = Math.ceil((dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  for (let i = 0; i < dayCount; i++) {
    const date = new Date(dateStart);
    date.setDate(dateStart.getDate() + i);

    plan.push({
      date: date.toISOString().split('T')[0],
      weather: 'Sunny',
      activities: input.interests.map(interest => ({
        title: `Explore ${interest} spot`,
      })),
      notes: '',
    });
  }

  return {
    id: 'mock-' + Date.now(),
    title: `Trip to ${input.destination}`,
    preference: input,
    plan,
    createdAt: new Date().toISOString(),
    isEditable: true,
    source: PlanSource.Generated,
  };
}
