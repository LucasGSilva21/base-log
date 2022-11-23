export const validatePrice = (value: number): boolean => {
  if (!value || value < 0 || !Number.isInteger(value)) {
    return false;
  }
  return true;
};
