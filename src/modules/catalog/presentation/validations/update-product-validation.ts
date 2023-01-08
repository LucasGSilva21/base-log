import { UpdateProductInputDto } from '@catalog/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  validate as validator
} from 'class-validator';

class UpdateProductValidationModel {
  @IsString()
  @IsOptional()
    productName: string;

  @IsNumber()
  @IsOptional()
    priceInCents: number;

  @IsNumber()
  @IsOptional()
    amount: number;

  @IsBoolean()
  @IsOptional()
    isActive: boolean;
}

export class UpdateProductValidation implements Validation<UpdateProductInputDto> {
  async validate (input: UpdateProductInputDto): Promise<void> {
    const updateProductValidate = new UpdateProductValidationModel();

    updateProductValidate.productName = input.productName;
    updateProductValidate.priceInCents = input.priceInCents;
    updateProductValidate.amount = input.amount;
    updateProductValidate.isActive = input.isActive;

    const errors = await validator(updateProductValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
