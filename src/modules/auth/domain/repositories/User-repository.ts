import { User } from '../entities/User';

export abstract class UserRepository {
  abstract saveUserCompany(user: User): Promise<User>;

  abstract saveUserIndividual(user: User): Promise<User>;

  abstract userByEmail(email: string): Promise<User | undefined>;

  abstract saveUpdateUser(user: Partial<User>): Promise<User | undefined>;

  abstract updateUser(
    id: string,
    user: Partial<User>,
  ): Promise<User | undefined>;
}
