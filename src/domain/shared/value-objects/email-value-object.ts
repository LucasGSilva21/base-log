import { ValueObject } from '@domain/shared/protocols';
import { DomainError } from '@domain/shared/errors';
import { validateEmail } from '@domain/shared/helpers';

export class Email implements ValueObject<string> {
  private _email: string;

  constructor(email: string) {
    this.validate(email);
    this._email = email;
  }

  getValue(): string {
    return this._email;
  }

  private validate(email: string): void {
    const isValid = validateEmail(email);
    if (!isValid) {
      throw new DomainError(`The email ${email} is invalid`);
    }
  }
}
