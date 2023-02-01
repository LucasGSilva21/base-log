import { UseCase } from '@shared/application/protocols';
import { NotifyPaymentStatusInputDto } from '@notification/application/dtos';
import { NotifyService } from '@notification/application/services';

export class NotifyPaymentStatusUseCase implements UseCase<NotifyPaymentStatusInputDto, void> {
  constructor (
    private readonly notifyService: NotifyService
  ) {}

  private makeMessage (data: NotifyPaymentStatusInputDto): string {
    return `The status to order with id "${data.orderId}" is "${data.status}".`;
  }

  async exec (data: NotifyPaymentStatusInputDto): Promise<void> {
    const message = this.makeMessage(data);
    await this.notifyService.sendEmailToAdmin(message);
  }
}
