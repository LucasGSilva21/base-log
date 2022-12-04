import 'module-alias/register';
import { makeLambdaHandler } from '@shared/framework/utils';
import { makeCreateProductController } from '@catalog/framework/factories/controllers';

const controller = makeCreateProductController();

export const handler = makeLambdaHandler(controller);
