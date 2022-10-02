import { BaseEntity } from '../shared/entities/base-entity';
import { AggregateRoot } from '../shared/protocols';
import { Id, UserName, Email, Password } from '../shared/value-objects';

export interface AccountProps {
  id?: Id
  userName: UserName
  email: Email
  password: Password
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface AccountPrimitivesProps {
  id: string
  userName: string
  email: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export class AccountEntity extends BaseEntity implements AggregateRoot<AccountPrimitivesProps> {
  private _userName: UserName;
  private _email: Email;
  private _password: Password;
  private _isActive: boolean;

  constructor(props: AccountProps) {
    super(
      props.id,
      props.createdAt,
      props.updatedAt
    );
    this._userName = props.userName;
    this._email = props.email;
    this._password = props.password;
    this._isActive = props.isActive || false;
  }

  get userName(): UserName {
    return this._userName;
  }

  get email(): Email {
    return this._email;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  async comparePassword (value: string): Promise<boolean> {
    return this._password.comparePassword(value);
  }

  mapperToPrimitives(): AccountPrimitivesProps {
    return {
      id: this.id.getValue(),
      userName: this.userName.getValue(),
      email: this.email.getValue(),
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
