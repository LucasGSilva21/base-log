import { BaseEntity } from '@shared/domain/utils/base-entity';
import { AggregateRoot } from '@shared/domain/protocols';
import { Id } from '@shared/domain/value-objects';
import { TotalInCents } from '@payment/domain/value-objects';

export enum TransactionStatus {
  PENDING = 1,
  APPROVED = 2,
  RECUSED = 3,
  CANCELED = 4
}

export interface TransactionProps {
  id?: Id
  orderId: Id
  totalInCents: TotalInCents
  status: TransactionStatus
  createdAt?: Date
  updatedAt?: Date
}

export interface TransactionPrimitivesProps {
  id: string
  orderId: string
  totalInCents: number
  status: TransactionStatus
  createdAt: Date
  updatedAt: Date
}

export class TransactionEntity extends BaseEntity implements AggregateRoot<TransactionPrimitivesProps> {
  private _orderId: Id;
  private _totalInCents: TotalInCents;
  private _status: TransactionStatus;

  constructor(props: TransactionProps) {
    super(
      props.id,
      props.createdAt,
      props.updatedAt
    );
    this._orderId = props.orderId;
    this._totalInCents = props.totalInCents;
    this._status = props.status;
  }

  get orderId(): Id {
    return this._orderId;
  }

  get totalInCents(): TotalInCents {
    return this._totalInCents;
  }

  get status(): TransactionStatus {
    return this._status;
  }

  mapperToPrimitives(): TransactionPrimitivesProps {
    return {
      id: this.id.getValue(),
      orderId: this.orderId.getValue(),
      totalInCents: this.totalInCents.getValue(),
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
