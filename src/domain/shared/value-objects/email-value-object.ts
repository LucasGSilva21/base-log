import { ValueObject } from '@domain/shared/protocols';
import { InvalidEmailError } from '@domain/shared/errors';
import { validateEmail } from '@domain/shared/helpers';

export class Email implements ValueObject<string> {
  private _email: string;

  private constructor(email: string) {
    this._email = email;
  }

  static create(email: string): Email {
    const isValid = this.validate(email);
    if (!isValid) {
      throw new InvalidEmailError(email);
    }
    return new Email(email);
  }

  getValue(): string {
    return this._email;
  }

  static validate(email: string): boolean {
    const isValid = validateEmail(email);
    if (!isValid) {
      return false;
    }
    return true;
  }
}
