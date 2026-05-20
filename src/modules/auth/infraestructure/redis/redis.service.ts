import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  client!: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: 'redis://localhost:6379',
    });

    await this.client.connect();
  }
}
