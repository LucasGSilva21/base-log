import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { Schema, SchemaDefinition } from 'dynamoose/dist/Schema';
import { AccountPrimitivesProps } from '@domain/entities/account';

interface Account extends Item, AccountPrimitivesProps {}

const schemaDefinition: SchemaDefinition = {
  id: {
    type: String,
    hashKey: true
  },
  userName: {
    type: String
  },
  email: {
    type: String,
    index: {
      name: 'dev-email-index',
    }
  },
  password: {
    type: String
  },
  isActive: {
    type: Boolean
  }
};

const schema = new Schema(schemaDefinition, { timestamps: true, saveUnknown: true });

const modelOptions = {
  create: false,
  waitForActive: false
};

export const AccountModel = dynamoose.model<Account>(
  'baselog-dev-accounts',
  schema,
  modelOptions
);
