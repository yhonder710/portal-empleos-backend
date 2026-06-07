import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User-repository';
import { LoginUserInputPort } from '../../domain/interfaces/User.interface';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ServicesToken } from '../services/Save-token';
import type { HashService } from '../../domain/interfaces/hash-service.interface';

@Injectable()
export class UsersUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    @Inject('HASH_SERVICE')
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly servicesToken: ServicesToken,
  ) {}

  async login(userPort: LoginUserInputPort) {
    const user = await this.userRepo.userByEmail(userPort.email);

    if (!user) {
      throw new UnauthorizedException('El email no encontrado');
    }

    const isPasswordvalid = await this.hashService.compare(
      userPort.password,
      user.password,
    );

    if (!isPasswordvalid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = {
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.servicesToken.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }
}
