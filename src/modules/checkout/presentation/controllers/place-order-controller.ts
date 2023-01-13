import { PlaceOrderInputDto, PlaceOrderOutputDto } from '@checkout/application/dtos';
import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { created, makeOutputError } from '@shared/presentation/utils';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  OutputError
} from '@shared/presentation/protocols';

export class PlaceOrderController implements Controller<PlaceOrderInputDto, PlaceOrderOutputDto> {
  constructor (
    private readonly placeOrderUseCase: UseCase<PlaceOrderInputDto, PlaceOrderOutputDto>,
    private readonly validation: Validation<PlaceOrderInputDto>
  ) {}

  async handler (httpRequest: HttpRequest<PlaceOrderInputDto>): Promise<HttpResponse<PlaceOrderOutputDto | OutputError>> {
    try {
      const { body } = httpRequest;

      await this.validation.validate(body);

      const account = await this.placeOrderUseCase.exec(body);

      return created(account);
    } catch (error) {
      console.log('@@@ERROR@@@', error);
      return makeOutputError(error as ErrorBase);
    }
  }
}
