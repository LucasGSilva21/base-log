export interface PaymentGatewayServiceInput {
  totalInCents: number
  orderId: string
  transactionId: string
}

export interface PaymentGatewayServiceOutput {
  paymentLink: string
  totalInCents: number
  createdAt: Date
}

export interface PaymentGatewayService {
  processPayment (data: PaymentGatewayServiceInput): Promise<PaymentGatewayServiceOutput>
}
