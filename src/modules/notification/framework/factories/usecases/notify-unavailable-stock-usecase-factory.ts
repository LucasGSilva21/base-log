import { NotifyUnavailableStockUseCase } from '@notification/application/usecases';
import { SnsNotifyService } from '@notification/framework/services';

export const makeNotifyUnavailableStockUseCase = (): NotifyUnavailableStockUseCase => {
  const snsNotifyService = new SnsNotifyService();
  return new NotifyUnavailableStockUseCase(snsNotifyService);
};
