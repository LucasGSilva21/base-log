import { UseCase } from '@shared/application/protocols';
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from '@payment/application/dtos';
import { Validation } from '@shared/presentation/protocols';

export class ProcessPaymentController {
  constructor (
    private readonly processPaymentUseCase: UseCase<ProcessPaymentInputDto, ProcessPaymentOutputDto>,
    private readonly validation: Validation<ProcessPaymentInputDto>
  ) {}

  async handler (input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    await this.validation.validate(input);

    const processPayment = await this.processPaymentUseCase.exec(input);

    return processPayment;
  }
}
