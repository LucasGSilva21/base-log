import { NotifyPaymentStatusInputDto } from '@notification/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class NotifyPaymentStatusValidationModel {
  @IsString()
  @IsNotEmpty()
    orderId: string;

  @IsString()
  @IsNotEmpty()
    status: string;
}

export class NotifyPaymentStatusValidation implements Validation<NotifyPaymentStatusInputDto> {
  async validate (input: NotifyPaymentStatusInputDto): Promise<void> {
    const notifyPaymentStatusValidate = new NotifyPaymentStatusValidationModel();

    notifyPaymentStatusValidate.orderId = input.orderId;
    notifyPaymentStatusValidate.status = input.status;

    const errors = await validator(notifyPaymentStatusValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
