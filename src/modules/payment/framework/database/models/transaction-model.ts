import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { Schema, SchemaDefinition } from 'dynamoose/dist/Schema';
import { TransactionPrimitivesProps } from '@payment/domain/entities';

interface Transaction extends Item, TransactionPrimitivesProps {}

const schemaDefinition: SchemaDefinition = {
  id: {
    type: String,
    hashKey: true
  },
  orderId: {
    type: String
  },
  totalInCents: {
    type: Number,
  },
  status: {
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

export const TransactionModel = dynamoose.model<Transaction>(
  process.env.DYNAMODB_TRANSACTIONS,
  schema,
  modelOptions
);
