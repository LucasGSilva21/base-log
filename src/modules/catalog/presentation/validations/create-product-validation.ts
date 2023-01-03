import { CreateProductInputDto } from '@catalog/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class CreateProductValidationModel {
  @IsString()
  @IsNotEmpty()
    productName: string;

  @IsNumber()
  @IsNotEmpty()
    priceInCents: number;

  @IsNumber()
  @IsNotEmpty()
    amount: number;
}

export class CreateProductValidation implements Validation<CreateProductInputDto> {
  async validate (input: CreateProductInputDto): Promise<void> {
    const createProductValidate = new CreateProductValidationModel();

    createProductValidate.productName = input.productName;
    createProductValidate.priceInCents = input.priceInCents;
    createProductValidate.amount = input.amount;

    const errors = await validator(createProductValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
