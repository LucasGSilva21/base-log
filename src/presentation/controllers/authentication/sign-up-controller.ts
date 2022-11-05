import { ErrorBase } from '@domain/protocols';
import { UseCase } from '@application/shared/protocols';
import { SignUpInputDto, SignUpOutputDto } from '@application/dtos/authentication';
import { Controller, HttpRequest, HttpResponse, OutputError } from '@presentation/shared/protocols';
import { created, makeOutputErrorHelper } from '@presentation/utils';

export class SignUpController implements Controller<SignUpOutputDto> {
  constructor (
    private readonly signUpUseCase: UseCase<SignUpInputDto, SignUpOutputDto>,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<SignUpOutputDto | OutputError>> {
    try {
      const { body } = httpRequest;

      const account = await this.signUpUseCase.exec(body);

      return created(account);
    } catch (error) {
      return makeOutputErrorHelper(error as ErrorBase);
    }
  }
}
