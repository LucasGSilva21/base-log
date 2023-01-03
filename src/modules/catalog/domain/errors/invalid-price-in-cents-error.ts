import { ErrorBase } from '@shared/domain/protocols';

export class InvalidPriceInCentsError extends Error implements ErrorBase {
  readonly type: string;

  constructor (priceInCents: number) {
    super(`The price "${priceInCents}" is invalid`);
    this.type = 'errors/catalog/invalidPriceInCents';
    this.name = 'Invalid Price In Cents';
  }
}
