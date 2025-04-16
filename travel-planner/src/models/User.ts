import { TravelPlan } from './TravelPlan';  

export interface User {
  id: string;
  username: string;
  savedPlans: TravelPlan[];
  createdPlans: TravelPlan[];
}
