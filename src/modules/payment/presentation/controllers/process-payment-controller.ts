import { UseCase } from '@shared/application/protocols';
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from '@payment/application/dtos';
import {
  Validation,
  OutputError
} from '@shared/presentation/protocols';

export class ProcessPaymentController {
  constructor (
    private readonly processPaymentUseCase: UseCase<ProcessPaymentInputDto, ProcessPaymentOutputDto>,
    private readonly validation: Validation<ProcessPaymentInputDto>
  ) {}

  async handler (input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto | OutputError> {
    try {
      await this.validation.validate(input);

      const processPayment = await this.processPaymentUseCase.exec(input);

      return processPayment;
    } catch (error) {
      return error as OutputError;
    }
  }
}
