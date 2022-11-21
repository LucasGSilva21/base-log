export const validateProductName = (name: string): boolean => {
  if (!name || !name.trim() || name.trim().length > 255) {
    return false;
  }
  return true;
};
