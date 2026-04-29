import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtConstants } from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { CustomRequest } from '../domain/interfaces/Custom-request';
import { JwtPayload } from '../domain/interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();
    const token = request.cookies.access_token;

    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    const payload: JwtPayload = await this.jwtService.verifyAsync(
      token,
      jwtConstants,
    );

    request['user'] = payload;

    return true;
  }
}
