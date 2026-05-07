import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { CustomRequest } from '../domain/interfaces/Custom-request';
import { JwtPayload } from '../domain/interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('No se encontró el token de acceso');
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('El token ha expirado');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token inválido o malformado');
      }
      // Cualquier otro error inesperado
      throw new UnauthorizedException('Error de autenticación');
    }
  }
}
