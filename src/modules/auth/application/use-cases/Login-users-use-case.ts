import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/User-repository';
import { LoginUserInputPort } from '../../domain/interfaces/User.interface';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ServicesToken } from '../services/Save-token';

@Injectable()
export class UsersUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly servicesToken: ServicesToken,
  ) {}

  async login(userPort: LoginUserInputPort) {
    const user = await this.userRepo.userByEmail(userPort.email);

    if (!user) {
      throw new UnauthorizedException('El email no encontrado');
    }

    const isPasswordvalid = await bcrypt.compare(
      userPort.password,
      user.password,
    );

    if (!isPasswordvalid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
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
