import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { Schema, SchemaDefinition } from 'dynamoose/dist/Schema';
import { ProductPrimitivesProps } from '@catalog/domain/entities';

interface Product extends Item, ProductPrimitivesProps {}

const schemaDefinition: SchemaDefinition = {
  id: {
    type: String,
    hashKey: true
  },
  productName: {
    type: String
  },
  price: {
    type: Number,
  },
  amount: {
    type: Number
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

export const ProductModel = dynamoose.model<Product>(
  process.env.DYNAMODB_PRODUCTS,
  schema,
  modelOptions
);
