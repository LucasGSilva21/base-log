export const validatePrice = (value: number): boolean => {
  if (!value || value < 0) {
    return false;
  }
  return true;
};
