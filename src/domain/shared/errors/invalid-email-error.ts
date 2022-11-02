import { ErrorBase } from '@domain/shared/protocols';

export class InvalidEmailError extends Error implements ErrorBase {
  readonly type: string;

  constructor (email: string) {
    super(`The email "${email}" is invalid`);
    this.type = 'errors/authentication/invalidEmail';
    this.name = 'Invalid Email';
  }
}
