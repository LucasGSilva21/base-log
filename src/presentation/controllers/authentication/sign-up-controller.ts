import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@application/protocols';
import { SignUpInputDto, SignUpOutputDto } from '@application/dtos/authentication';
import { Controller, HttpRequest, HttpResponse, OutputError } from '@presentation/protocols';
import { created, makeOutputError } from '@presentation/utils';

export class SignUpController implements Controller<SignUpOutputDto> {
  constructor (
    private readonly signUpUseCase: UseCase<SignUpInputDto, SignUpOutputDto>,
  ) {}

  async handler (httpRequest: HttpRequest): Promise<HttpResponse<SignUpOutputDto | OutputError>> {
    try {
      const { body } = httpRequest;

      const account = await this.signUpUseCase.exec(body);

      return created(account);
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
