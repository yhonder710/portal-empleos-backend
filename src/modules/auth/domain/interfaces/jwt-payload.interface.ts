import { Role } from './User.interface';

export interface JwtPayload {
  email: string;
  roles: Role;
}
