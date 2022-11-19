import { ErrorBase } from '@shared/domain/protocols';
import { UseCase } from '@shared/application/protocols';
import { SignUpInputDto, SignUpOutputDto } from '@authentication/application/dtos';
import { Controller, HttpRequest, HttpResponse, OutputError } from '@shared/presentation/protocols';
import { created, makeOutputError } from '@shared/presentation/utils';

export class SignUpController implements Controller<SignUpInputDto, SignUpOutputDto> {
  constructor (
    private readonly signUpUseCase: UseCase<SignUpInputDto, SignUpOutputDto>,
  ) {}

  async handler (httpRequest: HttpRequest<SignUpInputDto>): Promise<HttpResponse<SignUpOutputDto | OutputError>> {
    try {
      const { body } = httpRequest;

      const account = await this.signUpUseCase.exec(body);

      return created(account);
    } catch (error) {
      return makeOutputError(error as ErrorBase);
    }
  }
}
