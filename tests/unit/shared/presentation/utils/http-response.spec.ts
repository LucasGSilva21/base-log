import { ok, created, noContent, badRequest, notFound, serverError } from '@shared/presentation/utils';
import { ExampleError } from '@tests/utils/mocks/errors';

describe('Http Resonse', () => {
  test('should return 200 when calls ok method', async () => {
    const data = { example: 'test' };
    const result = ok(data);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(data);
  });

  test('should return 201 when calls created method', async () => {
    const data = { example: 'test' };
    const result = created(data);
    expect(result.statusCode).toBe(201);
    expect(result.body).toBe(data);
  });

  test('should return 204 when calls noContent method', async () => {
    const result = noContent();
    expect(result.statusCode).toBe(204);
  });

  test('should return 400 when calls badRequest method', async () => {
    const error = new ExampleError();
    const result = badRequest(error);
    expect(result.statusCode).toBe(400);
    expect(result.body.error.type).toBe(error.type);
    expect(result.body.error.title).toBe(error.name);
    expect(result.body.error.message).toBe(error.message);
  });

  test('should return 404 when calls notFound method', async () => {
    const error = new ExampleError();
    const result = notFound(error);
    expect(result.statusCode).toBe(404);
    expect(result.body.error.type).toBe(error.type);
    expect(result.body.error.title).toBe(error.name);
    expect(result.body.error.message).toBe(error.message);
  });

  test('should return 500 when calls serverError method', async () => {
    const result = serverError();
    expect(result.statusCode).toBe(500);
    expect(result.body.error.type).toBe('errors/common/unexpectedError');
    expect(result.body.error.title).toBe('Unexpected Error');
    expect(result.body.error.message).toBe('Please, try again later');
  });
});
