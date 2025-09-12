import { RegisterOptions } from "react-hook-form";
import {
  FieldSchema,
  IntegerFieldSchema,
  StringFieldSchema,
  DecimalFieldSchema,
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
      const decimalField = field as DecimalFieldSchema;
      const decimalRules: RegisterOptions = {};

      // Проверка на число
      decimalRules.pattern = {
        value: /^-?\d*\.?\d+$/,
        message: `${field.label} должно быть числом`,
      };

      // Проверка minimum значения
      if (decimalField.minimum !== undefined && !isNaN(decimalField.minimum)) {
        decimalRules.min = {
          value: decimalField.minimum,
          message: `${field.label} должно быть не менее ${decimalField.minimum}`,
        };
      }

      // Проверка maximum значения
      if (decimalField.maximum !== undefined && !isNaN(decimalField.maximum)) {
        decimalRules.max = {
          value: decimalField.maximum,
          message: `${field.label} должно быть не более ${decimalField.maximum}`,
        };
      }

      // Проверка количества знаков после запятой
      if (
        decimalField.decimalPlaces !== undefined &&
        !isNaN(decimalField.decimalPlaces)
      ) {
        decimalRules.validate = {
          decimalPlaces: (value: string) => {
            if (!value) return true; // пустое значение пропускаем

            const num = parseFloat(value);
            if (isNaN(num)) return true;

            const decimalPart = value.split(".")[1];
            const actualDecimalPlaces = decimalPart ? decimalPart.length : 0;

            return (
              actualDecimalPlaces <= decimalField.decimalPlaces! ||
              `${field.label} должно иметь не более ${decimalField.decimalPlaces} знаков после запятой`
            );
          },
        };
      }

      return { ...requiredRule, ...decimalRules };

    case "datetime":
      // TODO: добавить валидации для datetime
      return requiredRule;

    default:
      return requiredRule;
  }
};
