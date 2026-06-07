// src/shared/services/redis.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { OtpService } from '../../modules/auth/domain/port/otp-service.interface';

@Injectable()
export class RedisService implements OnModuleInit, OtpService {
  client!: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: 'redis://localhost:6379',
    });

    await this.client.connect();
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async generateAndSaveCode(email: string): Promise<string> {
    const code = this.generateCode();
    const key = `otp:${email}`;
    await this.client.set(key, code, {
      EX: 300,
    });

    return code;
  }

  async verifyCode(email: string, userCode: string): Promise<boolean> {
    const key = `otp:${email}`;
    const storedCode = await this.client.get(key);

    if (!storedCode) {
      return false;
    }

    const isValid = storedCode === userCode;

    if (isValid) {
      await this.client.del(key);
    }

    return isValid;
  }
}
