import {
  FieldSchema,
  StringFieldSchema,
  IntegerFieldSchema,
  DecimalFieldSchema,
  DateTimeFieldSchema,
} from "@/components/Constructor/types";
import { RegisterOptions } from "react-hook-form";
import {
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  decimalPlaces,
  isValidDate,
  minDate,
  maxDate,
} from "@/lib/validators";

export const getValidationRules = (field: FieldSchema): RegisterOptions => {
  const validate: Record<string, any> = {};

  // Обязательность
  if (field.required) {
    validate.required = required(`${field.label} обязательно для заполнения`);
  }

  switch (field.type) {
    case "string":
      const stringField = field as StringFieldSchema;

      if (stringField.minLength) {
        validate.minLength = minLength(stringField.minLength);
      }

      if (stringField.maxLength) {
        validate.maxLength = maxLength(stringField.maxLength);
      }

      return { validate };

    case "integer":
      const integerField = field as IntegerFieldSchema;

      if (integerField.min !== undefined) {
        validate.minValue = minValue(integerField.min);
      }

      if (integerField.max !== undefined) {
        validate.maxValue = maxValue(integerField.max);
      }

      return { validate };

    case "decimal":
      const decimalField = field as DecimalFieldSchema;

      if (decimalField.minimum !== undefined) {
        validate.minValue = minValue(decimalField.minimum);
      }

      if (decimalField.maximum !== undefined) {
        validate.maxValue = maxValue(decimalField.maximum);
      }

      if (decimalField.decimalPlaces !== undefined) {
        validate.decimalPlaces = decimalPlaces(decimalField.decimalPlaces);
      }

      return { validate };

    case "datetime":
      const datetimeField = field as DateTimeFieldSchema;

      validate.validDate = isValidDate;

      if (datetimeField.min) {
        validate.minDate = minDate(datetimeField.min);
      }

      if (datetimeField.max) {
        validate.maxDate = maxDate(datetimeField.max);
      }

      return { validate };

    default:
      return { validate };
  }
};
