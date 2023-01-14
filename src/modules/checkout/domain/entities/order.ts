import { BaseEntity } from '@shared/domain/utils/base-entity';
import { AggregateRoot } from '@shared/domain/protocols';
import { Id, Amount, TotalInCents } from '@shared/domain/value-objects';
import { ProductPrimitivesProps } from '@catalog/domain/entities';
import { TransactionPrimitivesProps } from '@payment/domain/entities';

export enum OrderStatus {
  PENDING = 1,
  APPROVED = 2,
  RECUSED = 3,
  CANCELED = 4,
  FAILURED = 5
}

export interface OrderProps {
  id?: Id
  totalInCents: TotalInCents
  status: OrderStatus
  product: Partial<ProductPrimitivesProps>
  amount: Amount
  transaction?: Partial<TransactionPrimitivesProps>
  createdAt?: Date
  updatedAt?: Date
}

export interface OrderPrimitivesProps {
  id: string
  totalInCents: number
  status: OrderStatus
  product: Partial<ProductPrimitivesProps>
  amount: number
  transaction?: Partial<TransactionPrimitivesProps>
  createdAt: Date
  updatedAt: Date
}

export class OrderEntity extends BaseEntity implements AggregateRoot<OrderPrimitivesProps> {
  private _totalInCents: TotalInCents;
  private _status: OrderStatus;
  private _product: Partial<ProductPrimitivesProps>;
  private _amount: Amount;
  private _transaction?: Partial<TransactionPrimitivesProps>;

  private constructor(props: OrderProps) {
    super(
      props.id,
      props.createdAt,
      props.updatedAt
    );
    this._totalInCents = props.totalInCents;
    this._status = props.status;
    this._product = props.product;
    this._amount = props.amount;
    this._transaction = props.transaction;
  }

  static create(props: OrderProps): OrderEntity {
    return new OrderEntity(props);
  }

  get totalInCents(): TotalInCents {
    return this._totalInCents;
  }

  get status(): OrderStatus {
    return this._status;
  }

  set status(status: OrderStatus) {
    this._status = status;
  }

  get product(): Partial<ProductPrimitivesProps> {
    return this._product;
  }

  get amount(): Amount {
    return this._amount;
  }

  get transaction(): Partial<TransactionPrimitivesProps> {
    return this._transaction;
  }

  mapperToPrimitives(): OrderPrimitivesProps {
    return {
      id: this.id.getValue(),
      totalInCents: this.totalInCents.getValue(),
      status: this.status,
      product: this._product,
      amount: this.amount.getValue(),
      transaction: this._transaction,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
