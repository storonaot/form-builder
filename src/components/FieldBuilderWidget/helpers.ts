import { FieldSettings } from "../types.ts";

/**
 * Фильтрует пустые значения из настроек поля, сохраняя обязательные поля
 * @param fieldSettings - настройки поля для фильтрации
 * @returns очищенные настройки поля
 */
export const cleanFieldSettings = (
  fieldSettings: FieldSettings
): Partial<FieldSettings> => {
  const result: Partial<FieldSettings> = {};

  // Обязательные поля всегда сохраняем
  result.type = fieldSettings.type;
  result.name = fieldSettings.name;
  result.label = fieldSettings.label;
  result.required = fieldSettings.required;

  // Обрабатываем опциональные поля
  for (const [key, value] of Object.entries(fieldSettings)) {
    // Пропускаем уже обработанные обязательные поля
    if (
      key === "type" ||
      key === "name" ||
      key === "label" ||
      key === "required"
    ) {
      continue;
    }

    // Убираем пустые значения
    if (value === "" || value === undefined || value === null) {
      continue;
    }

    // Для числовых полей проверяем, что это не NaN
    if (typeof value === "number" && isNaN(value)) {
      continue;
    }

    // Добавляем валидное значение
    (result as any)[key] = value;
  }

  return result;
};
