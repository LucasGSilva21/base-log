import 'module-alias/register';
import { makeLambdaHandler } from '@shared/framework/utils';
import { makePlaceOrderController } from '@checkout/framework/factories/controllers';

const controller = makePlaceOrderController();

export const handler = makeLambdaHandler(controller);
