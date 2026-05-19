import { Injectable } from '@nestjs/common';

@Injectable()
export class accountVerificationUseCase {
  constructor() {}

  sendVerificationCode(email: string) {
    const codigo_aleatorio = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    return codigo_aleatorio;
  }

  verifyCode() {}
}
