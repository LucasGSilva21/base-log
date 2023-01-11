import { UseCase } from '@shared/application/protocols';
import { FindProductByIdInputDto, FindProductByIdOutputDto } from '@catalog/application/dtos';
import { Validation } from '@shared/presentation/protocols';

export class FindProductByIdController {
  constructor (
    private readonly findProductByIdUseCase: UseCase<FindProductByIdInputDto, FindProductByIdOutputDto>,
    private readonly validation: Validation<FindProductByIdInputDto>
  ) {}

  async handler (input: FindProductByIdInputDto): Promise<FindProductByIdOutputDto> {
    await this.validation.validate(input);

    const { product } = await this.findProductByIdUseCase.exec(input);

    return { product };
  }
}
