import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MailService } from '../../../../shared/services/messageEmail.service';
import type { UserRepository } from '../../domain/repositories/User-repository';
import { User } from '../../domain/entities/User';
import type { OtpService } from '../../domain/port/otp-service.interface';

@Injectable()
export class AccountVerificationUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    @Inject('OTP_SERVICE_PORT')
    private otpService: OtpService,
    private mailerService: MailService,
  ) {}

  async sendVerificationCode(email: string) {
    const codigo = await this.otpService.generateAndSaveCode(email);

    await this.mailerService.sendVerificationCode(email, codigo);
  }

  async verifyCode(email: string, userCode: string) {
    const valid = await this.otpService.verifyCode(email, userCode);

    if (!valid) {
      throw new BadRequestException('Código inválido o expirado');
    }

    const user = await this.userRepo.userByEmail(email);

    if (!user) {
      throw new BadRequestException('User inválido');
    }

    user.verifyAccount();

    await this.userRepo.saveUpdateUser(user);

    return {
      success: true,
      message: 'Código verificado correctamente',
    };
  }
}
