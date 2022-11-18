import { APIGatewayEvent } from 'aws-lambda';
import { Controller } from '@authentication/presentation/protocols';
import { LambdaHandlerResult } from '@authentication/framework/protocols';

export const normalizeEventData = (event: APIGatewayEvent) => {
  const body = JSON.parse(event.body);
  return {
    body: {
      ...body
    }
  };
};

export const makeLambdaHandler = (controller: Controller<any>) => {
  return async (event: APIGatewayEvent): Promise<LambdaHandlerResult> => {
    const httpRequest = normalizeEventData(event);
    const { statusCode, body } = await controller.handler(httpRequest);
    return {
      statusCode,
      body: JSON.stringify(body)
    };
  };
};
