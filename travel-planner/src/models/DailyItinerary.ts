import { Activity } from './Activity';

export interface DailyItinerary {
  date: string;
  weather?: string;
  activities: Activity[];
  notes?: string;
}
