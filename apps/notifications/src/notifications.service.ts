import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from '../dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transport = nodemailer.createTransport({
    host: this.configService.get('SMTP_HOST'),
    port: this.configService.get('SMTP_PORT'),
    auth: {
      user: this.configService.get('SMTP_AUTH_USER'),
      pass: this.configService.get('SMTP_AUTH_USER_PASSWORD'),
    },
    // service: 'gmail',
    // auth: {
    //   type: 'OAuth2',
    //   user: this.configService.get('SMTP_USER'),
    //   clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
    //   clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
    //   refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    // },
  });

  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transport
      .sendMail({
        from: this.configService.get('SMTP_USER'),
        to: email,
        subject: 'Sleepr Notification',
        text,
      })
      .then(() => console.info(`Email successfully sent to ${email}`))
      .catch((error) => console.error(error));
  }
}
