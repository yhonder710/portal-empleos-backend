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

@Injectable()
export class ClearTokenUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly servicesToken: ServicesToken,
  ) {}

  async clearToken(refreshToken: string) {
    const payload: JwtPayload = await this.jwtService.verify(refreshToken);

    const user = await this.userRepo.userByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('El user no encontrado');
    }

    if (user.refreshToken === undefined) {
      throw new UnauthorizedException('El token no encontrado');
    }

    await this.servicesToken.clearToken(user.id);

    return { message: 'Logout exitoso' };
  }
}
