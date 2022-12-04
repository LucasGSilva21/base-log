import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { ListProductsOutputDto } from '@catalog/application/dtos';
import { ok, makeOutputError } from '@shared/presentation/utils';
import { Controller, HttpResponse, OutputError } from '@shared/presentation/protocols';

export class ListProductsController implements Controller<undefined, ListProductsOutputDto> {
  constructor (
    private readonly listProductsUseCase: UseCase<undefined, ListProductsOutputDto>
  ) {}

  async handler (): Promise<HttpResponse<ListProductsOutputDto | OutputError>> {
    try {
      const products = await this.listProductsUseCase.exec();

      return ok(products);
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
