import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { Schema, SchemaDefinition } from 'dynamoose/dist/Schema';
import { OrderPrimitivesProps } from '@checkout/domain/entities';

interface Order extends Item, OrderPrimitivesProps {}

const schemaDefinition: SchemaDefinition = {
  id: {
    type: String,
    hashKey: true
  },
  totalInCents: {
    type: Number,
  },
  status: {
    type: Number
  },
  amount: {
    type: Number
  },
  product: {
    type: Object
  },
  transaction: {
    type: Object,
    required: false
  }
};

const schema = new Schema(schemaDefinition, { timestamps: true, saveUnknown: true });

const modelOptions = {
  create: false,
  waitForActive: false
};

export const OrderModel = dynamoose.model<Order>(
  process.env.DYNAMODB_ORDERS,
  schema,
  modelOptions
);
