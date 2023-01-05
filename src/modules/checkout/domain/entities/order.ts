import { BaseEntity } from '@shared/domain/utils/base-entity';
import { AggregateRoot } from '@shared/domain/protocols';
import { Id, Amount, TotalInCents } from '@shared/domain/value-objects';
import { ProductEntity, ProductPrimitivesProps } from '@catalog/domain/entities';
import { TransactionEntity, TransactionPrimitivesProps } from '@payment/domain/entities';

export enum OrderStatus {
  PENDING = 1,
  APPROVED = 2,
  RECUSED = 3,
  CANCELED = 4
}

export interface OrderProps {
  id?: Id
  totalInCents: TotalInCents
  status: OrderStatus
  product: ProductEntity
  amount: Amount
  transaction: TransactionEntity
  createdAt?: Date
  updatedAt?: Date
}

export interface OrderPrimitivesProps {
  id: string
  totalInCents: number
  status: OrderStatus
  product: ProductPrimitivesProps
  amount: number
  transaction: TransactionPrimitivesProps
  createdAt: Date
  updatedAt: Date
}

export class OrderEntity extends BaseEntity implements AggregateRoot<OrderPrimitivesProps> {
  private _totalInCents: TotalInCents;
  private _status: OrderStatus;
  private _product: ProductEntity;
  private _amount: Amount;
  private _transaction: TransactionEntity;

  constructor(props: OrderProps) {
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

  get totalInCents(): TotalInCents {
    return this._totalInCents;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get product(): ProductEntity {
    return this._product;
  }

  get amount(): Amount {
    return this._amount;
  }

  get transaction(): TransactionEntity {
    return this._transaction;
  }

  mapperToPrimitives(): OrderPrimitivesProps {
    return {
      id: this.id.getValue(),
      totalInCents: this.totalInCents.getValue(),
      status: this.status,
      product: this._product.mapperToPrimitives(),
      amount: this.amount.getValue(),
      transaction: this._transaction.mapperToPrimitives(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
