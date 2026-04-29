import { Module } from '@nestjs/common';
import { JobsModule } from './modules/jobs/jobs.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    JobsModule,
    MessagingModule,
    NotificationsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
