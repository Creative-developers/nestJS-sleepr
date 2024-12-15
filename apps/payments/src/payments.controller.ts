import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async getHello() {
    return 'Hello World!';
  }

  @MessagePattern('create_charge')
  async createCharge(@Payload() data: PaymentsCreateChargeDto) {
    return await this.paymentsService.createCharge(data);
  }
}
