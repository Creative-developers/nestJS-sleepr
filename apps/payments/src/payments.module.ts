import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  LoggerModule,
  NOTIFICATIONS_PACKAGE_NAME,
  NOTIFICATIONS_SERVICE_NAME,
} from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: NOTIFICATIONS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/notifications.proto'),
            url: configService.getOrThrow('NOTIFICATIONS_GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],

  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
