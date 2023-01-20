import { APIGatewayEvent } from 'aws-lambda';
import { Controller } from '@shared/presentation/protocols';
import { LambdaHandlerResult } from '@shared/framework/protocols';

export const normalizeEventData = (event: APIGatewayEvent) => {
  const body = JSON.parse(event.body);
  const params = event.pathParameters;
  const query = event.queryStringParameters;
  const accountId = event.requestContext?.authorizer?.id;
  return {
    body: {
      accountId,
      ...body
    },
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
