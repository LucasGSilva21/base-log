export const validateUserName = (value: string): boolean => {
  return /(?=^([^0-9]*)$)(?=(?!^ +$)^.+$)/.test(value);
};

export const validateEmail = (value: string): boolean => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
};
