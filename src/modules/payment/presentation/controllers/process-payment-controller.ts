import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from '@payment/application/dtos';
import { ok, makeOutputError } from '@shared/presentation/utils';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  OutputError
} from '@shared/presentation/protocols';

export class ProcessPaymentController implements Controller<ProcessPaymentInputDto, ProcessPaymentOutputDto> {
  constructor (
    private readonly processPaymentUseCase: UseCase<ProcessPaymentInputDto, ProcessPaymentOutputDto>,
    private readonly validation: Validation<ProcessPaymentInputDto>
  ) {}

  async handler (httpRequest: HttpRequest<ProcessPaymentInputDto>): Promise<HttpResponse<ProcessPaymentOutputDto | OutputError>> {
    try {
      const { body } = httpRequest;

      await this.validation.validate(body);

      const account = await this.processPaymentUseCase.exec(body);

      return ok(account);
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
