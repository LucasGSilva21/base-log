import { BaseEntity } from '@shared/domain/utils/base-entity';
import { AggregateRoot } from '@shared/domain/protocols';
import { Id } from '@shared/domain/value-objects';
import { ProductName, PriceInCents, Amount } from '@catalog/domain/value-objects';

export interface ProductProps {
  id?: Id
  productName: ProductName
  priceInCents: PriceInCents
  amount: Amount
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ProductPrimitivesProps {
  id: string
  productName: string
  priceInCents: number
  amount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export class ProductEntity extends BaseEntity implements AggregateRoot<ProductPrimitivesProps> {
  private _productName: ProductName;
  private _priceInCents: PriceInCents;
  private _amount: Amount;
  private _isActive: boolean;

  constructor(props: ProductProps) {
    super(
      props.id,
      props.createdAt,
      props.updatedAt
    );
    this._productName = props.productName;
    this._priceInCents = props.priceInCents;
    this._amount = props.amount;
    this._isActive = props.isActive ?? false;
  }

  get productName(): ProductName {
    return this._productName;
  }

  get priceInCents(): PriceInCents {
    return this._priceInCents;
  }

  get amount(): Amount {
    return this._amount;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  mapperToPrimitives(): ProductPrimitivesProps {
    return {
      id: this.id.getValue(),
      productName: this.productName.getValue(),
      priceInCents: this.priceInCents.getValue(),
      amount: this.amount.getValue(),
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
