import { AccountEntity } from '@authentication/domain/entities';
import { Id } from '@shared/domain/value-objects';
import { UserName, Email, Password } from '@authentication/domain/value-objects';
import { AccountRepository } from '@authentication/application/repositories';
import { AccountModel } from '@authentication/framework/database/models';

export class DynamodbAccountRepository implements AccountRepository {
  async create (data: AccountEntity): Promise<AccountEntity> {
    const account = await AccountModel.create({
      id: data.id.getValue(),
      userName: data.userName.getValue(),
      email: data.email.getValue(),
      password: data.password.getValue(),
      isActive: data.isActive
    });

    return new AccountEntity({
      id: Id.create(account.id),
      userName: UserName.create(account.userName),
      email: Email.create(account.email),
      password: Password.create(account.password, true),
      isActive: account.isActive,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    });
  }

  async findByEmail (email: Email): Promise<AccountEntity> {
    const account = await AccountModel.query('email')
      .eq(email.getValue())
      .using(process.env.EMAIL_INDEX)
      .exec();

    if (!account[0]) {
      return null;
    }

    return new AccountEntity({
      id: Id.create(account[0].id),
      userName: UserName.create(account[0].userName),
      email: Email.create(account[0].email),
      password: Password.create(account[0].password, true),
      isActive: account[0].isActive,
      createdAt: account[0].createdAt,
      updatedAt: account[0].updatedAt
    });
  }
}
