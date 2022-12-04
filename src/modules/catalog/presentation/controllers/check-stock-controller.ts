import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { CheckStockInputDto, CheckStockOutputDto } from '@catalog/application/dtos';
import { ok, makeOutputError } from '@shared/presentation/utils';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  OutputError
} from '@shared/presentation/protocols';

export class CheckStockController implements Controller<CheckStockInputDto, CheckStockOutputDto> {
  constructor (
    private readonly checkStockUseCase: UseCase<CheckStockInputDto, CheckStockOutputDto>,
    private readonly validation: Validation<CheckStockInputDto>
  ) {}

  async handler (httpRequest: HttpRequest<CheckStockInputDto>): Promise<HttpResponse<CheckStockOutputDto | OutputError>> {
    try {
      const { body, params } = httpRequest;

      await this.validation.validate(body);

      const account = await this.checkStockUseCase.exec({
        productId: params.id,
        amount: body.amount
      });

      return ok(account);
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
