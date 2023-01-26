import { UseCase } from '@shared/application/protocols';
import { Validation } from '@shared/presentation/protocols';
import { NotifyUnavailableStockInputDto } from '@notification/application/dtos';

export class NotifyUnavailableStockController {
  constructor (
    private readonly notifyUnavailableStockUseCase: UseCase<NotifyUnavailableStockInputDto, void>,
    private readonly validation: Validation<NotifyUnavailableStockInputDto>
  ) {}

  async handler (input: NotifyUnavailableStockInputDto): Promise<void> {
    await this.validation.validate(input);

    await this.notifyUnavailableStockUseCase.exec(input);
  }
}
