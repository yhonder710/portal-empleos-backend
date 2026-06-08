import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from './dto/Login-user.dto';
import { UsersUseCase } from '../../application/use-cases/Login-users-use-case';

import type { Response } from 'express';
import type {
  CustomRequest,
  RequestWithUser,
} from '../../domain/interfaces/Custom-request';
import { AuthGuard } from '../../guard/auth.guard';
import { UsersIndividualUseCase } from '../../application/use-cases/Register-individual';
import { UsersCompanyUseCase } from '../../application/use-cases/Register-company';
import { CreateCompanyDto } from './dto/Create-company.dto';
import { CreateIndividualDto } from './dto/Create-individual.dto';
import { RefreshTokenUseCase } from '../../application/use-cases/Refresh-token-use-case';
import { ClearTokenUseCase } from '../../application/use-cases/Logout-user-use-case';
import { AccountVerificationUseCase } from '../../application/use-cases/Account-verification';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordUseCase } from '../../application/use-cases/Change-password-use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private useCaseLogin: UsersUseCase,
    private useCaseIndividual: UsersIndividualUseCase,
    private useCaseCompany: UsersCompanyUseCase,
    private useCaseRefreshToken: RefreshTokenUseCase,
    private useCaseClearToken: ClearTokenUseCase,
    private useCaseVerification: AccountVerificationUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  @Post('/register/user')
  async createUserIndividual(@Body() createUserDto: CreateIndividualDto) {
    const user = await this.useCaseIndividual.register(createUserDto);

    return {
      id: user.id,
      status: 'ok',
    };
  }

  @Post('/register/company')
  async createUserCompany(@Body() createUserDto: CreateCompanyDto) {
    const user = await this.useCaseCompany.register(createUserDto);

    return {
      id: user.id,
      status: 'ok',
    };
  }

  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    const user = await this.useCaseLogin.login(loginUserDto);

    res.cookie('access_token', user.accessToken, {
      httpOnly: true,
      secure: true, // true en production
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15, // 15min
    });

    res.cookie('refresh_token', user.refreshToken, {
      httpOnly: true,
      secure: true, // true en production
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { message: 'Login successful' };
  }

  @Post('/refresh')
  async refresh(
    @Req() req: CustomRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('No tienes nigun token aun');
    }

    const newToken = await this.useCaseRefreshToken.refreshToken(refreshToken);

    res.cookie('access_token', newToken.newAccessToken, {
      httpOnly: true,
      secure: true, // true en production
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15,
    });

    res.cookie('refresh_token', newToken.newRefreshToken, {
      httpOnly: true,
      secure: true, // true en production
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { message: 'refreshed' };
  }

  @Get('/') // cambiar por ruta de cookies
  @UseGuards(AuthGuard)
  verUsers(@Req() req: RequestWithUser) {
    const user = req.user;

    return {
      user: user,
      message: 'Haz accedido',
    };
  }

  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: CustomRequest,
  ) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('No tienes nigun token aun');
    }

    const clearToken = await this.useCaseClearToken.clearToken(refreshToken);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return clearToken;
  }

  @Post('/send-verification-code')
  @UseGuards(AuthGuard)
  async sendVerificationCode(@Req() req: RequestWithUser) {
    const user = req.user;

    await this.useCaseVerification.sendVerificationCode(user.email);

    return {
      user: user,
      message: 'Se a enviado el codigo',
    };
  }

  @Post('verify-code')
  async verifyCode(@Body() body: VerifyCodeDto) {
    return this.useCaseVerification.verifyCode(body.email, body.code);
  }

  @Patch('change-password')
  async changePassword(@Body() dto: ChangePasswordDto) {
    await this.changePasswordUseCase.execute(dto.email, dto.NewPassword);
    return { message: 'Contraseña actualizada correctamente.' };
  }
}
