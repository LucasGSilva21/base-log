import 'module-alias/register';
import { makeLambdaHandler } from '@shared/framework/utils';
import { makeListProductsController } from '@catalog/framework/factories/controllers';

const controller = makeListProductsController();

export const handler = makeLambdaHandler(controller);
