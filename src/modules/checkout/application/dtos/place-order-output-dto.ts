import { OrderPrimitivesProps } from '@checkout/domain/entities';

export interface PlaceOrderOutputDto {
  order: OrderPrimitivesProps
  paymentLink: string
}
