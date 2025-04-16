import { Interest } from './Enums';

export interface FormInput {
  destination: string;
  startDate: string;
  endDate: string;
  interests: Interest[];
}
