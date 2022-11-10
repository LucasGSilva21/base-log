import 'module-alias/register';
import { makeLambdaHandler } from '@framework/utils';
import { makeSignUpController } from '@framework/factories/controllers/authentication';

const controller = makeSignUpController();

export const handler = makeLambdaHandler(controller);
