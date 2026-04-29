import { Role } from '../entities/User';

export interface JwtPayload {
  email: string;
  roles: Role;
}
