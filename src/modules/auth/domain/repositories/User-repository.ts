import { User } from '../entities/User';

export interface UserRepository {
  saveUserCompany(user: User): Promise<User>;

  saveUserIndividual(user: User): Promise<User>;

  userByEmail(email: string): Promise<User | undefined>;

  saveUpdateUser(user: Partial<User>): Promise<User | undefined>;

  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
}
