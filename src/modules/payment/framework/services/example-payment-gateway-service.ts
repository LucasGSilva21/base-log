import {
  PaymentGatewayService,
  PaymentGatewayServiceInput,
  PaymentGatewayServiceOutput
} from '@payment/application/services';

export class ExamplePaymentGatewayService implements PaymentGatewayService {
  async processPayment (data: PaymentGatewayServiceInput): Promise<PaymentGatewayServiceOutput> {
    return {
      paymentLink: `https://example-payment.com.br/baselog?total=${data.totalInCents}`,
      totalInCents: data.totalInCents,
      createdAt: new Date()
    };
  }
}
