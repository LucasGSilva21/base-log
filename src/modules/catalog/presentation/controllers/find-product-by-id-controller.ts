import { UseCase } from '@shared/application/protocols';
import { FindProductByIdInputDto, FindProductByIdOutputDto } from '@catalog/application/dtos';
import {
  Validation,
  OutputError
} from '@shared/presentation/protocols';

export class FindProductByIdController {
  constructor (
    private readonly findProductByIdUseCase: UseCase<FindProductByIdInputDto, FindProductByIdOutputDto>,
    private readonly validation: Validation<FindProductByIdInputDto>
  ) {}

  async handler (input: FindProductByIdInputDto): Promise<FindProductByIdOutputDto | OutputError> {
    try {
      await this.validation.validate(input);

      await this.findProductByIdUseCase.exec(input);
    } catch (error) {
      return (error as OutputError);
    }
  }
}
