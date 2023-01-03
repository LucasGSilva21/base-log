import { ErrorBase } from '@shared/domain/protocols';

export class InvalidTotalInCentsError extends Error implements ErrorBase {
  readonly type: string;

  constructor (totalInCents: number) {
    super(`The value "${totalInCents}" is invalid`);
    this.type = 'errors/catalog/invalidTotalInCents';
    this.name = 'Invalid Total In Cents';
  }
}
