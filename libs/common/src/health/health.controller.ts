import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthContoller {
  @Get('/')
  health() {
    return true;
  }
}
