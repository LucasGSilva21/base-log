import { NotificationFacade } from '@notification/framework/facade';
import { makeNotifyUnavailableStockController } from '@notification/framework/factories/controllers';

export const makeNotificationFacade = (): NotificationFacade => {
  const notifyUnavailableStockController = makeNotifyUnavailableStockController();
  return new NotificationFacade(notifyUnavailableStockController);
};
