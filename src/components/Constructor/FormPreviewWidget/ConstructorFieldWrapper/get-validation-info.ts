import { FieldSchema } from "../../types";

export const getValidationInfo = (field: FieldSchema) => {
  const validations = [];

  if (field.required) validations.push("обязательное");

  switch (field.type) {
    case "string":
      if (field.minLength) validations.push(`мин. ${field.minLength} симв.`);
      if (field.maxLength) validations.push(`макс. ${field.maxLength} симв.`);
      break;
    case "integer":
      if (field.min !== undefined) validations.push(`мин. ${field.min}`);
      if (field.max !== undefined) validations.push(`макс. ${field.max}`);
      break;
    case "decimal":
      if (field.minimum !== undefined)
        validations.push(`мин. ${field.minimum}`);
      if (field.maximum !== undefined)
        validations.push(`макс. ${field.maximum}`);
      if (field.decimalPlaces !== undefined)
        validations.push(`${field.decimalPlaces} знаков`);
      break;
    case "datetime":
      if (field.min) {
        const minDate = new Date(field.min);
        validations.push(
          `мин. ${minDate.toLocaleDateString(
            "ru-RU"
          )} ${minDate.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
      }
      if (field.max) {
        const maxDate = new Date(field.max);
        validations.push(
          `макс. ${maxDate.toLocaleDateString(
            "ru-RU"
          )} ${maxDate.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
      }
      break;
  }

  return validations;
};
