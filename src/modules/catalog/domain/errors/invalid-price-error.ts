import { ErrorBase } from '@shared/domain/protocols';

export class InvalidPriceError extends Error implements ErrorBase {
  readonly type: string;

  constructor (price: number) {
    super(`The price "${price}" is invalid`);
    this.type = 'errors/catalog/invalidPrice';
    this.name = 'Invalid Price';
  }
}
