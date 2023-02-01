import { NotifyPaymentStatusUseCase } from '@notification/application/usecases';
import { SnsNotifyService } from '@notification/framework/services';

export const makeNotifyPaymentStatusUseCase = (): NotifyPaymentStatusUseCase => {
  const snsNotifyService = new SnsNotifyService();
  return new NotifyPaymentStatusUseCase(snsNotifyService);
};
