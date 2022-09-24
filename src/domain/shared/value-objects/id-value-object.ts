import { ValueObject } from '../protocols'
import { v4 as uuidv4, validate as validateUuid } from 'uuid'

export class Id implements ValueObject {
  private _id: string

  constructor (id?: string) {
    this._id = id || uuidv4()
  }

  getValue (): string {
    return this._id
  }

  validate (id: string): void {
    const isValid = validateUuid(id)
    if (!isValid) {
      throw new Error('Invalid Param')
    }
  }
}
