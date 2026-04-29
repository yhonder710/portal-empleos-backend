import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/User-repository';

export class MemoryUsersRepo implements UserRepository {
  private memoryRepo: User[] = [];

  async saveUser(user: User): Promise<User> {
    this.memoryRepo.push(user);
    return user;
  }

  async userByEmail(email: string): Promise<User | undefined> {
    return this.memoryRepo.find((user) => user.email === email);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const user = this.memoryRepo.find((u) => u.id === id);

    if (!user) return undefined;

    Object.assign(user, data);
    return user;
  }
}
