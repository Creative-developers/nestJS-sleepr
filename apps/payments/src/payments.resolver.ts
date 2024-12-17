import { Resolver, Query } from '@nestjs/graphql';
import { PaymentIntent } from './payment-intent.entity';
import { PaymentsService } from './payments.service';

@Resolver(() => PaymentIntent)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Query(() => [PaymentIntent], { name: 'paymentsx' })
  findAll() {
    return this.paymentsService.getPayments();
  }
}
