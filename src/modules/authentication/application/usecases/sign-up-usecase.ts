import { AccountEntity } from '@authentication/domain/entities';
import { UserName, Email, Password } from '@authentication/domain/value-objects';
import { UseCase } from '@shared/application/protocols';
import { DuplicatedEmailError } from '@authentication/application/errors';
import { SignUpInputDto, SignUpOutputDto } from '@authentication/application/dtos';
import { AccountRepository } from '@authentication/application/repositories';

export class SignUpUseCase implements UseCase<SignUpInputDto, SignUpOutputDto> {
  constructor (
    private readonly accountRepository: AccountRepository
  ) {}

  async exec (data: SignUpInputDto): Promise<SignUpOutputDto> {
    const userName = UserName.create(data.userName);
    const email = Email.create(data.email);
    const password = Password.create(data.password);
    const isActive = data.isActive;

    const emailAlreadyExists = await this.accountRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new DuplicatedEmailError(email.getValue());
    }

    const account = new AccountEntity({
      userName,
      email,
      password,
      isActive
    });

    const accountCreated = await this.accountRepository.create(account);

    return accountCreated.mapperToPrimitives();
  }
}
