import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infraestructure/http-server/auth.controller';
import { UsersUseCase } from './application/use-cases/Login-users-use-case';
import { UsersIndividualUseCase } from './application/use-cases/Register-individual';
import { UsersCompanyUseCase } from './application/use-cases/Register-company';
import { RefreshTokenUseCase } from './application/use-cases/Refresh-token-use-case';
import { ServicesToken } from './application/services/Save-token';
import { ClearTokenUseCase } from './application/use-cases/Logout-user-use-case';
import { PostgresDBRepo } from './infraestructure/Repository/Postgres_db.repo';
import { PrismaModule } from '../../prisma/prisma.module';
import 'dotenv/config';
import { MailService } from '../../shared/services/messageEmail.service';
import { AccountVerificationUseCase } from './application/use-cases/Account-verification';
import { ChangePasswordUseCase } from './application/use-cases/Change-password-use-case';
import { BcryptHashService } from './infraestructure/services/bcrypt-hash.service';
import { RedisService } from '../../shared/services/redis.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],

  providers: [
    MailService,
    AccountVerificationUseCase,
    UsersUseCase,
    UsersIndividualUseCase,
    UsersCompanyUseCase,
    RefreshTokenUseCase,
    ServicesToken,
    ClearTokenUseCase,
    ChangePasswordUseCase,
    { provide: 'USER_REPOSITORY', useClass: PostgresDBRepo },
    { provide: 'HASH_SERVICE', useClass: BcryptHashService },
    { provide: 'OTP_SERVICE_PORT', useClass: RedisService },
  ],

  controllers: [AuthController],
})
export class AuthModule {}
