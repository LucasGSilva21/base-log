import { UseCase } from '@shared/application/protocols';
import { UpdateProductInputDto } from '@catalog/application/dtos';
import {
  Validation,
  OutputError
} from '@shared/presentation/protocols';

export class UpdateProductController {
  constructor (
    private readonly updateProductUseCase: UseCase<UpdateProductInputDto, void>,
    private readonly validation: Validation<UpdateProductInputDto>
  ) {}

  async handler (input: UpdateProductInputDto): Promise<void | OutputError> {
    try {
      await this.validation.validate(input);

      await this.updateProductUseCase.exec(input);
    } catch (error) {
      return (error as OutputError);
    }
  }
}
