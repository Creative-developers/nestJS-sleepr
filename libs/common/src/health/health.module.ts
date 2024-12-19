import { Module } from '@nestjs/common';
import { HealthContoller } from './health.controller';

@Module({
  controllers: [HealthContoller],
})
export class HealthModule {}
