import { UpdateOrderInputDto } from '@checkout/application/dtos';
import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { noContent, makeOutputError } from '@shared/presentation/utils';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  OutputError
} from '@shared/presentation/protocols';

export class UpdateOrderController implements Controller<UpdateOrderInputDto, void> {
  constructor (
    private readonly updateOrderUseCase: UseCase<UpdateOrderInputDto, void>,
    private readonly validation: Validation<UpdateOrderInputDto>
  ) {}

  async handler (httpRequest: HttpRequest<UpdateOrderInputDto>): Promise<HttpResponse<void | OutputError>> {
    try {
      const { body } = httpRequest;

      await this.validation.validate(body);

      await this.updateOrderUseCase.exec(body);

      return noContent();
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
