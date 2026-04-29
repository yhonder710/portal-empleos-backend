import {
  Body,
  Controller,
  Get,
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

@Controller('auth')
export class AuthController {
  constructor(
    private useCaseLogin: UsersUseCase,
    private useCaseIndividual: UsersIndividualUseCase,
    private useCaseCompany: UsersCompanyUseCase,
    private useCaseRefreshToken: RefreshTokenUseCase,
    private useCaseClearToken: ClearTokenUseCase,
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
      secure: false, // true en production
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    res.cookie('refresh_token', user.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
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

    const newToken = this.useCaseRefreshToken.refreshToken(refreshToken);

    res.cookie('access_token', (await newToken).newAccessToken, {
      httpOnly: true,
      secure: false, // true en production
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15,
    });

    res.cookie('refresh_token', (await newToken).newRefreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { message: 'refreshed' };
  }

  @Get('/')
  @UseGuards(AuthGuard)
  verUsers(@Req() req: RequestWithUser) {
    const user = req.user;

    return {
      user: user,
      message: 'Haz accedido',
    };
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response, @Req() req: CustomRequest) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('No tienes nigun token aun');
    }

    const clearToken = this.useCaseClearToken.clearToken(refreshToken);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return clearToken;
  }
}
