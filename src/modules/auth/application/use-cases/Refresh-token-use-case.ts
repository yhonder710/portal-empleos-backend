import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/repositories/User-repository';
import { JwtPayload } from '../../domain/interfaces/jwt-payload.interface';
import { ServicesToken } from '../services/Save-token';
import type { HashService } from '../../domain/interfaces/hash-service.interface';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    @Inject('HASH_SERVICE')
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly servicesToken: ServicesToken,
  ) {}

  async refreshToken(refreshToken: string) {
    const payloadToken: JwtPayload = await this.jwtService.verify(refreshToken);

    const user = await this.userRepo.userByEmail(payloadToken.email);

    if (!user) {
      throw new UnauthorizedException('El user no encontrado');
    }

    const payload = { email: user.email, role: user.role };

    if (!user.refreshToken) {
      throw new UnauthorizedException('El token no encontrado');
    }

    const isValid = await this.hashService.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.servicesToken.saveRefreshToken(user.id, newRefreshToken);

    return {
      newAccessToken,
      newRefreshToken,
    };
  }
}
