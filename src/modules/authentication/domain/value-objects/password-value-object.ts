import { ValueObject } from '@shared/domain/protocols';
import { hasNumber, hasLowercase, hasUppercase } from '@shared/domain/utils';
import { InvalidPasswordError } from '@authentication/domain/errors';
import { hash, compare } from '@authentication/domain/utils';

export class Password implements ValueObject<string> {
  private _passwordHash: string;

  private constructor (passwordHash: string) {
    this._passwordHash = passwordHash;
  }

  static create (password: string, isHashed?: boolean): Password {
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

  getValue (): string {
    return this._passwordHash;
  }

  static validate (password: string): boolean {
    if (
      !password ||
      password.trim().length > 255 ||
      !hasNumber.test(password) ||
      !hasLowercase.test(password) ||
      !hasUppercase.test(password)
    ) {
      return false;
    }
    return true;
  }

  async comparePassword (password: string): Promise<boolean> {
    return compare(password, this._passwordHash);
  }
}
