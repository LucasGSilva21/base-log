import { ErrorBase } from '@shared/domain/protocols';

export class UnavailableStockError extends Error implements ErrorBase {
  readonly type: string;

  constructor (availableQuantity: number) {
    super(`Unavailable Stock. Only ${availableQuantity} units available`);
    this.type = 'errors/checkout/unavailableStock';
    this.name = 'Unavailable Stock';
  }
}
