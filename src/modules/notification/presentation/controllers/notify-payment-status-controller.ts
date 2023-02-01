import { UseCase } from '@shared/application/protocols';
import { Validation } from '@shared/presentation/protocols';
import { NotifyPaymentStatusInputDto } from '@notification/application/dtos';

export class NotifyPaymentStatusController {
  constructor (
    private readonly notifyPaymentStatusUseCase: UseCase<NotifyPaymentStatusInputDto, void>,
    private readonly validation: Validation<NotifyPaymentStatusInputDto>
  ) {}

  async handler (input: NotifyPaymentStatusInputDto): Promise<void> {
    await this.validation.validate(input);

    await this.notifyPaymentStatusUseCase.exec(input);
  }
}
