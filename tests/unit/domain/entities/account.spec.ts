import { AccountEntity } from '../../../../src/domain/entities';
import { Id, UserName, Email, Password } from '../../../../src/domain/shared/value-objects';
import { generateUuid } from '../../../../src/domain/shared/helpers';
import MockDate from 'mockdate';

jest.mock('bcrypt', () => ({
  hashSync (): string {
    return 'hash';
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true);
  }
}));

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should instantiate a new AccountEntity', () => {
    const userName = new UserName('Valid Name');
    const email = new Email('valid@email.com');
    const password = new Password({ password: '#Valid123#' });
    const account = new AccountEntity({ userName, email, password });
    expect(account.id).toBeDefined();
    expect(account.userName).toBe(userName);
    expect(account.email).toBe(email);
    expect(account.isActive).toBe(false);
    expect(account.createdAt).toBeDefined();
    expect(account.updatedAt).toBeDefined();
  });

  test('should instantiate a new AccountEntity with all fields', () => {
    const uuid = generateUuid();
    const id = new Id(uuid);
    const userName = new UserName('Valid Name');
    const email = new Email('valid@email.com');
    const password = new Password({ password: '#Valid123#' });
    const isActive = true;
    const createdAt = new Date();
    const updatedAt = new Date();
    const account = new AccountEntity({
      id, userName, email, password, isActive, createdAt, updatedAt
    });
    expect(account.id).toBe(id);
    expect(account.userName).toBe(userName);
    expect(account.email).toBe(email);
    expect(account.isActive).toBe(true);
    expect(account.createdAt).toBe(createdAt);
    expect(account.updatedAt).toBe(updatedAt);
  });

  test('should return true when compare succeds', async () => {
    const userName = new UserName('Valid Name');
    const email = new Email('valid@email.com');
    const password = new Password({ password: '#Valid123#' });
    const account = new AccountEntity({ userName, email, password });
    const isValid = await account.comparePassword('any_value');
    expect(isValid).toBe(true);
  });

  test('should return correct values when call mapper', async () => {
    const uuid = generateUuid();
    const id = new Id(uuid);
    const userName = new UserName('Valid Name');
    const email = new Email('valid@email.com');
    const password = new Password({ password: '#Valid123#' });
    const isActive = true;
    const createdAt = new Date();
    const updatedAt = new Date();
    const account = new AccountEntity({
      id, userName, email, password, isActive, createdAt, updatedAt
    });
    const accountPrimitivesProps = await account.mapperToPrimitives();
    expect(accountPrimitivesProps.id).toBe(id.getValue());
    expect(accountPrimitivesProps.userName).toBe(userName.getValue());
    expect(accountPrimitivesProps.email).toBe(email.getValue());
    expect(accountPrimitivesProps.isActive).toBe(true);
    expect(accountPrimitivesProps.createdAt).toBe(createdAt);
    expect(accountPrimitivesProps.updatedAt).toBe(updatedAt);
  });
});
