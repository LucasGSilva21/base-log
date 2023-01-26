import { NotifyUnavailableStockInputDto } from '@notification/application/dtos';

export interface NotificationFacadeInterface {
  notifyUnavailableStock(input: NotifyUnavailableStockInputDto): Promise<void>
}
