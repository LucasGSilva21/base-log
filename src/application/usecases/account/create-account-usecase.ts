import { AccountEntity } from '../../../domain/entities';
import { UserName, Email, Password } from '../../../domain/shared/value-objects';
import { UseCase } from '../../shared/protocols';
import { CreateAccountDto, ResultAccountDto } from '../../dtos/account';
import { AccountRepository } from '../../repositories';

export class CreateAccountUseCase implements UseCase<CreateAccountDto, ResultAccountDto> {
  constructor (
    private readonly accountRepository: AccountRepository
  ) {}

  async exec (data: CreateAccountDto): Promise<ResultAccountDto> {
    const userName = new UserName(data.userName);
    const email = new Email(data.email);
    const password = new Password({ password: data.password });
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
