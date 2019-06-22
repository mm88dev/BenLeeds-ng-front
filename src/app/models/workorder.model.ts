import { Job } from './job.model';
import { User } from './user.model';
export interface Workorder {
  user: User;
  submitDate?: Date;
  finishDate?: Date;
  sendDate?: Date;
  buildingNumber: number;
  apartmentNumber: number;
  jobs: Job[];
  status?: String;
}
