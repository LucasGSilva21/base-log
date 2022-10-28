import { ValueObject } from '@domain/shared/protocols';
import { InvalidPasswordError } from '@domain/shared/errors';
import { validatePassword, hash, compare } from '@domain/shared/helpers';

export class Password implements ValueObject<string> {
  private _passwordHash: string;

  private constructor(passwordHash: string) {
    this._passwordHash = passwordHash;
  }

  static create(password: string): Password {
    const isValid = this.validate(password);
    if (!isValid) {
      throw new InvalidPasswordError();
    }
    const passwordHash = hash(password);
    return new Password(passwordHash);
  }

  static load(passwordHash: string): Password {
    return new Password(passwordHash);
  }

  getValue(): string {
    return this._passwordHash;
  }

  static validate(password: string): boolean {
    const isValid = validatePassword(password);
    if (!isValid) {
      return false;
    }
    return true;
  }

  async comparePassword (password: string): Promise<boolean> {
    return compare(password, this._passwordHash);
  }
}
