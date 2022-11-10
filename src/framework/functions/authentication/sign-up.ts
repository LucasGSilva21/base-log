import 'module-alias/register';
import { LambdaHandlerResult } from '@framework/protocols';
import { makeSignUpController } from '@framework/factories/controllers/authentication';

export const handler = async (event: any): Promise<LambdaHandlerResult> => {
  const controller = makeSignUpController();
  const data = JSON.parse(event.body);
  const { statusCode, body } = await controller.handler({ body: data });
  return {
    statusCode,
    body: JSON.stringify(body)
  };
};
