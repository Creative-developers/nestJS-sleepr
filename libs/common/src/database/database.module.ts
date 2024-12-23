import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/sleepr')],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.getOrThrow('MYSQL_HOST'),
          port: configService.getOrThrow('MYSQL_PORT'),
          username: configService.getOrThrow('MYSQL_USERNAME'),
          database: configService.getOrThrow('MYSQL_DATABASE'),
          synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: EntityClassOrSchema[]): DynamicModule {
    return TypeOrmModule.forFeature(models);
  }
}
