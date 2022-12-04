import 'module-alias/register';
import { makeLambdaHandler } from '@shared/framework/utils';
import { makeCheckStockController } from '@catalog/framework/factories/controllers';

const controller = makeCheckStockController();

export const handler = makeLambdaHandler(controller);
