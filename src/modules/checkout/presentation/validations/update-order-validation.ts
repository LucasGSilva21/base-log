import { OrderStatus } from '@checkout/domain/entities';
import { UpdateOrderInputDto } from '@checkout/application/dtos';
import { TransactionStatus } from '@payment/domain/entities';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class UpdateOrderValidationModel {
  @IsString()
  @IsNotEmpty()
    orderId: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
    orderStatus: number;

  @IsEnum(TransactionStatus)
  @IsNotEmpty()
    transactionStatus: number;
}

export class UpdateOrderValidation implements Validation<UpdateOrderInputDto> {
  async validate (input: UpdateOrderInputDto): Promise<void> {
    const updateOrderValidate = new UpdateOrderValidationModel();

    updateOrderValidate.orderId = input.orderId;
    updateOrderValidate.orderStatus = input.orderStatus;
    updateOrderValidate.transactionStatus = input.transactionStatus;

    const errors = await validator(updateOrderValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
