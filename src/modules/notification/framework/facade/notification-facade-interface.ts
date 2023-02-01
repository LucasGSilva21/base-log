import { NotifyPaymentStatusInputDto, NotifyUnavailableStockInputDto } from '@notification/application/dtos';

export interface NotificationFacadeInterface {
  notifyPaymentStatus(input: NotifyPaymentStatusInputDto): Promise<void>,
  notifyUnavailableStock(input: NotifyUnavailableStockInputDto): Promise<void>
}
