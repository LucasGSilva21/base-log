import { ErrorBase } from '@domain/protocols';

export class InvalidIdError extends Error implements ErrorBase {
  readonly type: string;

  constructor (id: string) {
    super(`The id "${id}" is invalid`);
    this.type = 'errors/common/invalidId';
    this.name = 'Invalid Id';
  }
}
