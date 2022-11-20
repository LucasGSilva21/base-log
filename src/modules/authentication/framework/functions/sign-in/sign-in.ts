import 'module-alias/register';
import { makeLambdaHandler } from '@shared/framework/utils';
import { makeSignInController } from '@authentication/framework/factories/controllers';

const controller = makeSignInController();

export const handler = makeLambdaHandler(controller);
