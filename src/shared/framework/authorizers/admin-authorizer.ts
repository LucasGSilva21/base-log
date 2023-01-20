import jwt from 'jsonwebtoken';
import { generatePolicy } from '@shared/framework/authorizers/generate-policy';

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

    const account: any = jwt.verify(token, process.env.JWT_SECRET);

    if (!account || !account.isAdmin) {
      throw new Error('This account is not an administrator');
    }

    callback(null, generatePolicy('account', 'Allow', event.methodArn, account));
  } catch (error) {
    callback(null, generatePolicy('account', 'Deny', event.methodArn, undefined));
  }
};
