import { APIGatewayEvent } from 'aws-lambda';
import { Controller } from '@shared/presentation/protocols';
import { LambdaHandlerResult } from '@shared/framework/protocols';

export const normalizeEventData = (event: APIGatewayEvent) => {
  console.log('@@@', event.pathParameters);
  console.log('@@@', event.queryStringParameters);
  const body = JSON.parse(event.body);
  const params = event.pathParameters;
  const query = event.queryStringParameters;
  return {
    body: { ...body },
    params: { ...params },
    query: { ...query}
  };
};

export const makeLambdaHandler = (controller: Controller<any, any>) => {
  return async (event: APIGatewayEvent): Promise<LambdaHandlerResult> => {
    const httpRequest = normalizeEventData(event);
    const { statusCode, body } = await controller.handler(httpRequest);
    return {
      statusCode,
      body: JSON.stringify(body)
    };
  };
};
