import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    { apiVersion: '2024-11-20.acacia' },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // Disable redirect-based payment methods
      },
      // payment_method_types: ['card'],
      payment_method: 'pm_card_visa',
    });

    //notifiy email
    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has completed successfully`,
    });

    return paymentIntent;
  }

  async getPayments() {
    // get payments from your  Stripe API
    const payments = await this.stripe.paymentIntents.list({ limit: 10 });
    return payments.data;
  }
}
