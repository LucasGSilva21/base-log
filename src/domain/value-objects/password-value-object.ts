import { ValueObject } from '@domain/protocols';
import { InvalidPasswordError } from '@domain/errors';
import { hash, compare } from '@domain/utils';
import { validatePassword } from '@domain/validators';

export class Password implements ValueObject<string> {
  private _passwordHash: string;

  private constructor(passwordHash: string) {
    this._passwordHash = passwordHash;
  }

  static create(password: string, isHashed?: boolean): Password {
    if (isHashed) {
      return new Password(password);
    }
    const isValid = this.validate(password);
    if (!isValid) {
      throw new InvalidPasswordError();
    }
    const passwordHash = hash(password);
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
