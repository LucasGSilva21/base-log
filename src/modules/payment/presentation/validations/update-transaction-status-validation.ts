import { TransactionStatus } from '@payment/domain/entities';
import { UpdateTransactionStatusInputDto } from '@payment/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class UpdateTransactionStatusValidationModel {
  @IsString()
  @IsNotEmpty()
    transactionId: string;

  @IsEnum(TransactionStatus)
  @IsNotEmpty()
    status: TransactionStatus;
}

export class UpdateTransactionStatusValidation implements Validation<UpdateTransactionStatusInputDto> {
  async validate (input: UpdateTransactionStatusInputDto): Promise<void> {
    const updateTransactionStatusValidate = new UpdateTransactionStatusValidationModel();

    updateTransactionStatusValidate.transactionId = input.transactionId;
    updateTransactionStatusValidate.status = input.status;

    const errors = await validator(updateTransactionStatusValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}
