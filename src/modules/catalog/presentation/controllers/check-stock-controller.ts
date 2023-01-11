import { UseCase } from '@shared/application/protocols';
import { CheckStockInputDto, CheckStockOutputDto } from '@catalog/application/dtos';
import { Validation } from '@shared/presentation/protocols';

export class CheckStockController {
  constructor (
    private readonly checkStockUseCase: UseCase<CheckStockInputDto, CheckStockOutputDto>,
    private readonly validation: Validation<CheckStockInputDto>
  ) {}

  async handler (input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    await this.validation.validate(input);

    const account = await this.checkStockUseCase.exec(input);

    return account;
  }
}
