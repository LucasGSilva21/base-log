import { UseCase } from '@shared/application/protocols';
import { NotifyUnavailableStockInputDto } from '@notification/application/dtos';
import { NotifyService } from '@notification/application/services';

export class NotifyUnavailableStockUseCase implements UseCase<NotifyUnavailableStockInputDto, void> {
  constructor (
    private readonly notifyService: NotifyService
  ) {}

  private makeMessage (data: NotifyUnavailableStockInputDto): string {
    return `
      Unavailable Stock for the product with id "${data.productId}".
      ${data.amount} units expected.
      ${data.availableQuantity} units available.
    `;
  }

  async exec (data: NotifyUnavailableStockInputDto): Promise<void> {
    const message = this.makeMessage(data);
    await this.notifyService.sendEmailToAdmin(message);
  }
}
