import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OtpService } from '../../../../shared/services/otp.service';
import { MailService } from '../../../../shared/services/messageEmail.service';
import { UserRepository } from '../../domain/repositories/User-repository';
import { User } from '../../domain/entities/User';

@Injectable()
export class accountVerificationUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UserRepository,
    private otpService: OtpService,
    private mailerService: MailService,
  ) {}

  async sendVerificationCode(email: string) {
    const codigo = await this.otpService.saveCode(email);

    await this.mailerService.sendVerificationCode(email, codigo);

    return codigo;
  }

  async verifyCode(email: string, userCode: string) {
    const valid = await this.otpService.validateCode(email, userCode);

    if (!valid) {
      throw new BadRequestException('Código inválido o expirado');
    }

    const user = await this.userRepo.userByEmail(email);

    if (!user) {
      throw new BadRequestException('User inválido');
    }

    user.verifyAccount();

    console.log(user);

    await this.userRepo.saveUpdateUser(user);

    await this.otpService.deleteCode(email);

    return {
      success: true,
      message: 'Código verificado correctamente',
    };
  }
}
