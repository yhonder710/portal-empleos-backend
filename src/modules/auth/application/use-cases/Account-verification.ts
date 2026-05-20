import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OtpService } from '../../../../shared/services/otp.service';
import { MailService } from '../../../../shared/services/messageEmail.service';
import { UserRepository } from '../../domain/repositories/User-repository';

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

    const newData = await this.userRepo.updateUser(user.id, {
      isVerified: true,
    });

    await this.otpService.deleteCode(email);

    console.log(newData);

    return {
      success: true,
      message: 'Código verificado correctamente',
    };
  }
}
