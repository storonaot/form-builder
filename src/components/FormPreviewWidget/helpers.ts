import { RegisterOptions } from "react-hook-form";
import {
  FieldSchema,
  IntegerFieldSchema,
  StringFieldSchema,
} from "../types.ts";

export const getValidationRules = (field: FieldSchema): RegisterOptions => {
  // Обязательность
  const requiredRule = field.required
    ? { required: `${field.label} обязательно для заполнения` }
    : {};

  // Типо-специфичные валидации
  switch (field.type) {
    case "string":
      const stringField = field as StringFieldSchema;
      const stringRules: RegisterOptions = {};

      if (stringField.minLength) {
        stringRules.minLength = {
          value: stringField.minLength,
          message: `${field.label} должно быть не менее ${stringField.minLength} символов`,
        };
      }

      if (stringField.maxLength) {
        stringRules.maxLength = {
          value: stringField.maxLength,
          message: `${field.label} должно быть не более ${stringField.maxLength} символов`,
        };
      }

      return { ...requiredRule, ...stringRules };

    case "integer":
      const integerField = field as IntegerFieldSchema;
      const integerRules: RegisterOptions = {};

      // Проверка на целое число
      integerRules.pattern = {
        value: /^-?\d+$/,
        message: `${field.label} должно быть целым числом`,
      };

      // Проверка min значения
      if (integerField.min !== undefined && !isNaN(integerField.min)) {
        integerRules.min = {
          value: integerField.min,
          message: `${field.label} должно быть не менее ${integerField.min}`,
        };
      }

      // Проверка max значения
      if (integerField.max !== undefined && !isNaN(integerField.max)) {
        integerRules.max = {
          value: integerField.max,
          message: `${field.label} должно быть не более ${integerField.max}`,
        };
      }

      return { ...requiredRule, ...integerRules };

    case "decimal":
      // TODO: добавить валидации для decimal
      return requiredRule;

    case "datetime":
      // TODO: добавить валидации для datetime
      return requiredRule;

    default:
      return requiredRule;
  }
};
