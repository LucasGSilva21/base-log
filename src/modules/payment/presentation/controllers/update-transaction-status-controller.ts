import { UseCase } from '@shared/application/protocols';
import { UpdateTransactionStatusInputDto } from '@payment/application/dtos';
import { Validation } from '@shared/presentation/protocols';

export class UpdateTransactionStatusController {
  constructor (
    private readonly updateTransactionStatusUseCase: UseCase<UpdateTransactionStatusInputDto, void>,
    private readonly validation: Validation<UpdateTransactionStatusInputDto>
  ) {}

  async handler (input: UpdateTransactionStatusInputDto): Promise<void> {
    await this.validation.validate(input);

    await this.updateTransactionStatusUseCase.exec(input);
  }
}
