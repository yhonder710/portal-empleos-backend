import { Role } from './User.interface';

export interface UserIndividual {
  firstName: string;
  lastName: string;
}

export interface CreateUserIndividualInputPort {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
