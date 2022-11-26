import { ErrorBase } from '@shared/domain/protocols';

export class InvalidAmountError extends Error implements ErrorBase {
  readonly type: string;

  constructor (amount: number) {
    super(`The amount "${amount}" is invalid`);
    this.type = 'errors/catalog/invalidAmount';
    this.name = 'Invalid Amount';
  }
}
