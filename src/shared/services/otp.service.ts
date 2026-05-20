import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class OtpService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  // Generar código
  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Guardar código con TTL
  async saveCode(email: string) {
    const code = this.generateCode();

    // TTL = 300 segundos = 5 minutos
    await this.cacheManager.set(`otp:${email}`, code, 300 * 1000);

    return code;
  }

  // Validar código
  async validateCode(email: string, code: string) {
    const storedCode = await this.cacheManager.get<string>(`otp:${email}`);

    if (!storedCode) {
      return false;
    }

    return storedCode === code;
  }

  // Eliminar código manualmente
  async deleteCode(email: string) {
    await this.cacheManager.del(`otp:${email}`);
  }
}
