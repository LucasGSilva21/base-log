import { generateUuid, validateUuid } from '@domain/utils';

jest.mock('uuid', () => ({
  v4 (): string {
    return 'valid-uuid';
  },

  validate (): boolean {
    return true;
  }
}));

describe('Uuid Helper', () => {
  test('should generate a valid uuid', () => {
    const uuid = generateUuid();
    expect(uuid).toBe('valid-uuid');
  });

  test('should return true if the compare returns true', () => {
    const uuid = 'valid-uuid';
    const isValid = validateUuid(uuid);
    expect(isValid).toBe(true);
  });
});
