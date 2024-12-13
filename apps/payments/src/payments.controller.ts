import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async getHello() {
    return 'Hello World!';
  }

  @MessagePattern('create_charge')
  async createCharge(@Payload() data: CreateChargeDto) {
    return await this.paymentsService.createCharge(data);
  }
}
