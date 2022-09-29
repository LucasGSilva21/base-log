import { generateUuid, validateUuid } from '../../../../../src/domain/shared/helpers';

describe('Uuid Helper', () => {
  test('should generate a valid uuid', () => {
    const uuid = generateUuid();
    expect(uuid).toBeDefined();
    const isValid = validateUuid(uuid);
    expect(isValid).toBe(true);
  });
});
