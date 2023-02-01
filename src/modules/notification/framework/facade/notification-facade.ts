import { NotifyPaymentStatusInputDto, NotifyUnavailableStockInputDto } from '@notification/application/dtos';
import { NotifyPaymentStatusController, NotifyUnavailableStockController } from '@notification/presentation/controllers';
import { NotificationFacadeInterface } from '@notification/framework/facade';

export class NotificationFacade implements NotificationFacadeInterface {
  constructor (
    private readonly notifyPaymentStatusController: NotifyPaymentStatusController,
    private readonly notifyUnavailableStockController: NotifyUnavailableStockController
  ) {}

  async notifyPaymentStatus(input: NotifyPaymentStatusInputDto): Promise<void> {
    return this.notifyPaymentStatusController.handler(input);
  }

  async notifyUnavailableStock(input: NotifyUnavailableStockInputDto): Promise<void> {
    return this.notifyUnavailableStockController.handler(input);
  }
}
