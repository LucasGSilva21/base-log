import { ValueObject } from '@shared/domain/protocols';
import { InvalidEmailError } from '@authentication/domain/errors';
import { isEmail } from 'class-validator';

export class Email implements ValueObject<string> {
  private _email: string;

  private constructor (email: string) {
    this._email = email;
  }

  static create (email: string): Email {
    const isValid = this.validate(email);
    if (!isValid) {
      throw new InvalidEmailError(email);
    }
    return new Email(email);
  }

  getValue (): string {
    return this._email;
  }

  static validate (email: string): boolean {
    if (
      !email ||
      email.trim().length > 255 ||
      !isEmail(email)
    ) {
      return false;
    }
    return true;
  }
}
