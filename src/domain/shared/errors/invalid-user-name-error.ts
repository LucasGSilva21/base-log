import { DomainError } from '@domain/shared/protocols';

export class InvalidUserNameError extends Error implements DomainError {
  constructor (userName: string) {
    super(`The user name "${userName}" is invalid`);
    this.name = 'InvalidUserNameError';
  }
}
