import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { SignUpInputDto, SignUpOutputDto } from '@authentication/application/dtos';
import { created, makeOutputError } from '@shared/presentation/utils';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  OutputError
} from '@shared/presentation/protocols';

export class SignUpController implements Controller<SignUpInputDto, SignUpOutputDto> {
  constructor (
    private readonly signUpUseCase: UseCase<SignUpInputDto, SignUpOutputDto>,
    private readonly validation: Validation<SignUpInputDto>
  ) {}

  async handler (httpRequest: HttpRequest<SignUpInputDto>): Promise<HttpResponse<SignUpOutputDto | OutputError>> {
    try {
      const { body } = httpRequest;

      await this.validation.validate(body);

      const account = await this.signUpUseCase.exec(body);

      return created(account);
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
