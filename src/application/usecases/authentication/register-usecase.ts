import { AccountEntity } from '@domain/entities';
import { UserName, Email, Password } from '@domain/shared/value-objects';
import { UseCase } from '@application/shared/protocols';
import { RegisterInputDto, RegisterOutputDto } from '@application/dtos/authentication';
import { AccountRepository } from '@application/repositories';

export class RegisterUseCase implements UseCase<RegisterInputDto, RegisterOutputDto> {
  constructor (
    private readonly accountRepository: AccountRepository
  ) {}

  async exec (data: RegisterInputDto): Promise<RegisterOutputDto> {
    const userName = UserName.create(data.userName);
    const email = Email.create(data.email);
    const password = Password.create(data.password);
    const isActive = data.isActive;

    const emailAlreadyExists = await this.accountRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error(`The email ${email.getValue()} already exists`);
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
