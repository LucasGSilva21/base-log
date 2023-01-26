import { NotifyUnavailableStockInputDto } from '@notification/application/dtos';
import { NotifyUnavailableStockController } from '@notification/presentation/controllers';
import { NotificationFacadeInterface } from '@notification/framework/facade';

export class NotificationFacade implements NotificationFacadeInterface {
  constructor (
    private readonly notifyUnavailableStockController: NotifyUnavailableStockController
  ) {}

  async notifyUnavailableStock(input: NotifyUnavailableStockInputDto): Promise<void> {
    return this.notifyUnavailableStockController.handler(input);
  }
}
