import { TravelPlan } from './TravelPlan';

export interface Recommendation {
  id: string;
  title: string;
  summary: string;
  plan: TravelPlan;
  image?: string;
}
