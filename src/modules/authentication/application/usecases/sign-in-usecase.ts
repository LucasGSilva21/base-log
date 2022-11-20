import { Email, Password } from '@authentication/domain/value-objects';
import { UseCase } from '@shared/application/protocols';
import { InvalidCredentialsError } from '@authentication/application/errors';
import { SignInInputDto, SignInOutputDto } from '@authentication/application/dtos';
import { AccountRepository } from '@authentication/application/repositories';
import { encrypt } from '@authentication/application/utils';

export class SignInUseCase implements UseCase<SignInInputDto, SignInOutputDto> {
  constructor (
    private readonly accountRepository: AccountRepository
  ) {}

  async exec (data: SignInInputDto): Promise<SignInOutputDto> {
    const email = Email.create(data.email);
    const password = Password.create(data.password);

    const accountExists = await this.accountRepository.findByEmail(email);

    if (!accountExists) {
      throw new InvalidCredentialsError();
    }

    if (!password.comparePassword(accountExists.password.getValue())) {
      throw new InvalidCredentialsError();
    }

    return { accessToken: encrypt(accountExists.id.getValue()) };
  }
}
