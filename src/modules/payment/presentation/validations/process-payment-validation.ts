import { ProcessPaymentInputDto } from '@payment/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class ProcessPaymentValidationModel {
  @IsString()
  @IsNotEmpty()
    orderId: string;

  @IsNumber()
  @IsNotEmpty()
    totalInCents: number;
}

export class ProcessPaymentValidation implements Validation<ProcessPaymentInputDto> {
  async validate (input: ProcessPaymentInputDto): Promise<void> {
    const processPaymentValidate = new ProcessPaymentValidationModel();

    processPaymentValidate.orderId = input.orderId;
    processPaymentValidate.totalInCents = input.totalInCents;

    const errors = await validator(processPaymentValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
