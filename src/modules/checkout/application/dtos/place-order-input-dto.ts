import { OrderStatus } from '@checkout/domain/entities';

export interface PlaceOrderInputDto {
  totalInCents: number
  status: OrderStatus
  productId: string
  amount: number
}
