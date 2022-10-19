import { ValueObject } from '@domain/shared/protocols';
import { DomainError } from '@domain/shared/errors';
import { validatePassword, hash, compare } from '@domain/shared/helpers';

interface PasswordInput {
  password?: string
  passwordHash?: string
}

export class Password implements ValueObject<string> {
  private _passwordHash: string;

  constructor({
    password,
    passwordHash
  }: PasswordInput) {
    if (!password && !passwordHash) {
      throw new DomainError('A password or a password hash is required');
    }
    if (passwordHash) {
      this._passwordHash = passwordHash;
    } else {
      this.validate(password);
      this._passwordHash = hash(password);
    }
  }

  getValue(): string {
    return this._passwordHash;
  }

  async comparePassword (value: string): Promise<boolean> {
    return compare(value, this._passwordHash);
  }

  private validate(password: string): void {
    const isValid = validatePassword(password);
    if (!isValid) {
      throw new DomainError(`The password ${password} is invalid`);
    }
  }
}
