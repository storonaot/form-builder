import { nanoid } from "nanoid";

export const generateId = (): string => {
  return nanoid();
};

export const generateFormId = (): string => {
  return `form_${nanoid()}`;
};

export const generateFieldId = (): string => {
  return `field_${nanoid()}`;
};
