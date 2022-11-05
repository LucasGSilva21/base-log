import { AccountEntity } from '@domain/entities';
import { UserName, Email, Password } from '@domain/value-objects';
import { UseCase } from '@application/shared/protocols';
import { DuplicatedEmailError } from '@application/shared/errors';
import { SignUpInputDto, SignUpOutputDto } from '@application/dtos/authentication';
import { AccountRepository } from '@application/repositories';

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
