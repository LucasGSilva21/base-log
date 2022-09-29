import { v4 as uuidv4, validate } from 'uuid';

export const generateUuid = () => uuidv4();

export const validateUuid = (value: string) => validate(value);
