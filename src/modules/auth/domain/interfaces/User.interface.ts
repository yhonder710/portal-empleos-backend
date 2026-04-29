export interface LoginUserInputPort {
  email: string;
  password: string;
}

export enum Role {
  USER = 'user',
  COMPANY = 'company',
  ADMIN = 'admin',
}
