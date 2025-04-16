import { Interest } from './Enums';

export interface UserPreference {
  destination: string;
  startDate: string;
  endDate: string;
  interests: Interest[];
}
