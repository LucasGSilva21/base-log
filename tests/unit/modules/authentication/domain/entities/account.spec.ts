import { AccountEntity } from '@authentication/domain/entities';
import { Id } from '@shared/domain/value-objects';
import { UserName, Email, Password } from '@authentication/domain/value-objects';
import { generateUuid } from '@shared/domain/utils';
import MockDate from 'mockdate';

jest.mock('bcrypt', () => ({
  hashSync (): string {
    return 'hash';
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true);
  }
}));

interface SutTypes {
  sut: AccountEntity
  id: Id
  userName: UserName
  email: Email
  password: Password
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const makeSut = (): SutTypes => {
  const uuid = generateUuid();
  const id = Id.create(uuid);
  const userName = UserName.create('Valid Name');
  const email = Email.create('valid@email.com');
  const password = Password.create('#Valid123#');
  const isActive = true;
  const createdAt = new Date();
  const updatedAt = new Date();
  const sut = AccountEntity.create({
    id, userName, email, password, isActive, createdAt, updatedAt
  });

  return {
    sut, id, userName, email, password, isActive, createdAt, updatedAt
  };
};

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should create a new AccountEntity', () => {
    const {
      sut, id, userName, email, password, isActive, createdAt, updatedAt
    } = makeSut();
    expect(sut.id).toBe(id);
    expect(sut.userName).toBe(userName);
    expect(sut.email).toBe(email);
    expect(sut.password).toBe(password);
    expect(sut.isActive).toBe(isActive);
    expect(sut.createdAt).toBe(createdAt);
    expect(sut.updatedAt).toBe(updatedAt);
  });

  test('should return true when compare succeds', async () => {
    const userName = UserName.create('Valid Name');
    const email = Email.create('valid@email.com');
    const password = Password.create('#Valid123#');
    const account = AccountEntity.create({ userName, email, password });
    const isValid = await account.comparePassword('any_value');
    expect(isValid).toBe(true);
  });

  test('should return correct values when call mapper', () => {
    const {
      sut, id, userName, email, isActive, createdAt, updatedAt
    } = makeSut();
    const accountPrimitivesProps = sut.mapperToPrimitives();
    expect(accountPrimitivesProps.id).toBe(id.getValue());
    expect(accountPrimitivesProps.userName).toBe(userName.getValue());
    expect(accountPrimitivesProps.email).toBe(email.getValue());
    expect(accountPrimitivesProps.isActive).toBe(isActive);
    expect(accountPrimitivesProps.createdAt).toBe(createdAt);
    expect(accountPrimitivesProps.updatedAt).toBe(updatedAt);
  });
});
