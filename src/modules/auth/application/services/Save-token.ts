import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ServicesToken {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
  ) {}

  async saveRefreshToken(userid: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);

    await this.userRepo.updateUser(userid, {
      refreshToken: hashed,
    });
  }

  async clearToken(userId: string) {
    await this.userRepo.updateUser(userId, {
      refreshToken: undefined,
    });
  }
}
