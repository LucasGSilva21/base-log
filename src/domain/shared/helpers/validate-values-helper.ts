export const validateName = (value: string): boolean => {
  return /^[A-Za-z\s]*$/.test(value);
};
