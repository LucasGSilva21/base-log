import { BaseEntity } from '../shared/entities/base-entity'
import { AggregateRoot } from '../shared/protocols'
import { Id } from '../shared/value-objects/id-value-object'

export interface AccountProps {
  id?: Id
  name: string
  email: string
  password: string
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class AccountEntity extends BaseEntity implements AggregateRoot {
  private _name: string
  private _email: string
  private _password: string
  private _isActive: boolean

  constructor (props: AccountProps) {
    super(props.id)
    this._name = props.name
    this._email = props.email
    this._password = props.password
    this._isActive = props.isActive || false
  }

  get name (): string {
    return this._name
  }

  get email (): string {
    return this._email
  }

  get isActive (): boolean {
    return this._isActive
  }

  mapperToPrimitives () {
    return {
      id: this.id.getValue(),
      name: this.name,
      email: this.email,
      isActive: this.isActive
    }
  }
}
