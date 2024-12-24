import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import {
  AUTH_SERVICE,
  PAYMENTS_SERVICE,
  LoggerModule,
  HealthModule,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from './prisma.servie';

// Resolve and log the expected path of the .env file
// const envFilePath = resolve(process.cwd(), 'apps/reservations/.env');
// console.log('ConfigModule is looking for .env at:', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.required(),
        AUTH_HOST: Joi.required(),
        PAYMENTS_HOST: Joi.required(),
        AUTH_PORT: Joi.number().required(),
        PAYMENT_PORT: Joi.number().required(),
      }),
    }),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('PAYMENTS_HOST'),
            port: configService.get('PAYMENT_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    HealthModule,
    // ClientsModule.register([
    //   {
    //     name: AUTH_SERVICE,
    //     transport: Transport.TCP,
    //   },
    // ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService],
})
export class ReservationsModule {}
