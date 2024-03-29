import { PlaceOrderInputDto } from '@checkout/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class PlaceOrderValidationModel {
  @IsString()
  @IsNotEmpty()
    accountId: string;

  @IsString()
  @IsNotEmpty()
    productId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
    amount: number;
}

export class PlaceOrderValidation implements Validation<PlaceOrderInputDto> {
  async validate (input: PlaceOrderInputDto): Promise<void> {
    const placeOrderValidate = new PlaceOrderValidationModel();

    placeOrderValidate.accountId = input.accountId;
    placeOrderValidate.productId = input.productId;
    placeOrderValidate.amount = input.amount;

    const errors = await validator(placeOrderValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
