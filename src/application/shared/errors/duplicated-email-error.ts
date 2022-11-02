import { ErrorBase } from '@domain/shared/protocols';

export class DuplicatedEmailError extends Error implements ErrorBase {
  readonly type: string;

  constructor (email: string) {
    super(`The email "${email}" already exists`);
    this.type = 'errors/authentication/duplicatedEmail';
    this.name = 'Duplicated Email';
  }
}
