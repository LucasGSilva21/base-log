import { NotifyUnavailableStockInputDto } from '@notification/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class NotifyUnavailableStockValidationModel {
  @IsString()
  @IsNotEmpty()
    productId: string;

  @IsNumber()
  @IsNotEmpty()
    amount: number;

  @IsNumber()
  @IsNotEmpty()
    availableQuantity: number;
}

export class NotifyUnavailableStockValidation implements Validation<NotifyUnavailableStockInputDto> {
  async validate (input: NotifyUnavailableStockInputDto): Promise<void> {
    const notifyUnavailableStockValidate = new NotifyUnavailableStockValidationModel();

    notifyUnavailableStockValidate.productId = input.productId;
    notifyUnavailableStockValidate.amount = input.amount;
    notifyUnavailableStockValidate.availableQuantity = input.availableQuantity;

    const errors = await validator(notifyUnavailableStockValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
