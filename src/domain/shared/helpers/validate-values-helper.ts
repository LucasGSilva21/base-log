export const onlyLettersAndSpaces = (value: string): boolean => {
  return /^[A-Za-z\s]*$/.test(value);
};
