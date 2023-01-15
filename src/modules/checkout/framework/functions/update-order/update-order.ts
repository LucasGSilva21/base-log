import 'module-alias/register';
import { makeLambdaHandler } from '@shared/framework/utils';
import { makeUpdateOrderController } from '@checkout/framework/factories/controllers';

const controller = makeUpdateOrderController();

export const handler = makeLambdaHandler(controller);
