import { MailerOptions } from '@nestjs-modules/mailer';

export const getMailerConfig = (): MailerOptions => ({
  transport: {
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
});
