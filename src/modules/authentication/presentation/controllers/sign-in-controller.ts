import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { SignInInputDto, SignInOutputDto } from '@authentication/application/dtos';
import { ok, makeOutputError } from '@shared/presentation/utils';
import {
  Controller,
  Validation,
  HttpRequest,
  HttpResponse,
  OutputError
} from '@shared/presentation/protocols';

export class SignInController implements Controller<SignInInputDto, SignInOutputDto> {
  constructor (
    private readonly signInUseCase: UseCase<SignInInputDto, SignInOutputDto>,
    private readonly validation: Validation<SignInInputDto>
  ) {}

  async handler (httpRequest: HttpRequest<SignInInputDto>): Promise<HttpResponse<SignInOutputDto | OutputError>> {
    try {
      const { body } = httpRequest;

      await this.validation.validate(body);

      const accessToken = await this.signInUseCase.exec(body);

      return ok(accessToken);
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
