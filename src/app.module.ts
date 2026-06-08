import { Module } from '@nestjs/common';
import { JobsModule } from './modules/jobs/jobs.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from './config/mailer.config';

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
    //agregar modulo de chat
    AuthModule,
    JobsModule,
    NotificationsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
