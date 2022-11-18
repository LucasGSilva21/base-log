import 'module-alias/register';
import { makeLambdaHandler } from '@authentication/framework/utils';
import { makeSignUpController } from '@authentication/framework/factories/controllers';

const controller = makeSignUpController();

export const handler = makeLambdaHandler(controller);
