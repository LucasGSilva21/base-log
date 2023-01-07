import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { UpdateTransactionStatusInputDto } from '@payment/application/dtos';
import { noContent, makeOutputError } from '@shared/presentation/utils';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  OutputError
} from '@shared/presentation/protocols';

export class UpdateTransactionStatusController implements Controller<UpdateTransactionStatusInputDto, void> {
  constructor (
    private readonly updateTransactionStatusUseCase: UseCase<UpdateTransactionStatusInputDto, void>,
    private readonly validation: Validation<UpdateTransactionStatusInputDto>
  ) {}

  async handler (httpRequest: HttpRequest<UpdateTransactionStatusInputDto>): Promise<HttpResponse<void | OutputError>> {
    try {
      const { body } = httpRequest;

      await this.validation.validate(body);

      await this.updateTransactionStatusUseCase.exec(body);

      return noContent();
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
