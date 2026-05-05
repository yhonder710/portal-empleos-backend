import { Module } from '@nestjs/common';
import { JobsModule } from './modules/jobs/jobs.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from './config/mailer.config';

console.log('holaa');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MailerModule.forRootAsync({
      useFactory: () => getMailerConfig(),
    }),

    //modulos principales de la app
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
