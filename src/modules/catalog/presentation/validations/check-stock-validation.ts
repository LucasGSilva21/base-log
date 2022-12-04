import { CheckStockInputDto } from '@catalog/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNumberString,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class CheckStockValidationModel {
  @IsString()
  @IsNotEmpty()
    productId: string;

  @IsNumberString()
  @IsNotEmpty()
    amount: number;
}

export class CheckStockValidation implements Validation<CheckStockInputDto> {
  async validate (input: CheckStockInputDto): Promise<void> {
    const checkStockValidate = new CheckStockValidationModel();

    checkStockValidate.productId = input.productId;
    checkStockValidate.amount = input.amount;

    const errors = await validator(checkStockValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
