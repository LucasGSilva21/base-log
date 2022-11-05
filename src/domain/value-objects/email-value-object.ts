import { ValueObject } from '@domain/protocols';
import { InvalidEmailError } from '@domain/errors';
import { validateEmail } from '@domain/utils';

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
