import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { CreateProductInputDto, CreateProductOutputDto } from '@catalog/application/dtos';
import { created, makeOutputError } from '@shared/presentation/utils';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  OutputError
} from '@shared/presentation/protocols';

export class CreateProductController implements Controller<CreateProductInputDto, CreateProductOutputDto> {
  constructor (
    private readonly createProductUseCase: UseCase<CreateProductInputDto, CreateProductOutputDto>,
    private readonly validation: Validation<CreateProductInputDto>
  ) {}

  async handler (httpRequest: HttpRequest<CreateProductInputDto>): Promise<HttpResponse<CreateProductOutputDto | OutputError>> {
    try {
      const { body } = httpRequest;

      await this.validation.validate(body);

      const account = await this.createProductUseCase.exec(body);

      return created(account);
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
