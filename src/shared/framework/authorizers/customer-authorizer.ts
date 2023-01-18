import jwt from 'jsonwebtoken';

export const authorizer = function (
  event: any,
  context: any,
  callback: any
) {
  try {
    const authToken = event.authorizationToken;

    if (!authToken) {
      throw new Error('Token is missing');
    }

    const [, token] = authToken.split(' ');

    const user = jwt.verify(token, process.env.JWT_SECRET);

    callback(null, generatePolicy('user', 'Allow', event.methodArn, user));
  } catch (e) {
    callback(null, generatePolicy('user', 'Deny', event.methodArn, undefined));
  }
};

const generatePolicy = function (
  principalId: any,
  effect: any,
  resource: any,
  user: any
) {
  const authResponse: any = {};
  authResponse.principalId = principalId;

  if (effect && resource) {
    const policyDocument: any = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];

    const statementOne: any = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;

    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  if (user) {
    authResponse.context = user;
  }

  return authResponse;
};
