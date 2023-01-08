import { FindProductByIdInputDto } from '@catalog/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class FindProductByIdValidationModel {
  @IsString()
  @IsNotEmpty()
    productId: string;
}

export class FindProductByIdValidation implements Validation<FindProductByIdInputDto> {
  async validate (input: FindProductByIdInputDto): Promise<void> {
    const findProductByIdValidate = new FindProductByIdValidationModel();

    findProductByIdValidate.productId = input.productId;

    const errors = await validator(findProductByIdValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
