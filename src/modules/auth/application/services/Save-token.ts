import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User-repository';
import type { HashService } from '../../domain/interfaces/hash-service.interface';

@Injectable()
export class ServicesToken {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    @Inject('HASH_SERVICE')
    private readonly hashService: HashService,
  ) {}

  async saveRefreshToken(userId: string, refreshToken: string) {
    const hashed = await this.hashService.hash(refreshToken);

    await this.userRepo.updateUser(userId, {
      refreshToken: hashed,
    });
  }

  async clearToken(userId: string) {
    await this.userRepo.updateUser(userId, {
      refreshToken: undefined,
    });
  }
}
