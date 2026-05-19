export interface UserIndividual {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  experience: number;
  workArea: string;
  description: string;
}

export interface CreateUserIndividualInputPort {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  experience: number;
  workArea: string;
  description: string;
}
