import { NotificationFacade } from '@notification/framework/facade';
import {
  makeNotifyPaymentStatusController,
  makeNotifyUnavailableStockController
} from '@notification/framework/factories/controllers';

export const makeNotificationFacade = (): NotificationFacade => {
  const notifyPaymentStatusController = makeNotifyPaymentStatusController();
  const notifyUnavailableStockController = makeNotifyUnavailableStockController();
  return new NotificationFacade(notifyPaymentStatusController, notifyUnavailableStockController);
};
