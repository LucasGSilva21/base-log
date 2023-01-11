import { OrderEntity } from '@checkout/domain/entities';

export interface PlaceOrderOutputDto {
  order: OrderEntity
  paymentLink: string
}
