// Упрощенная функция для создания валидаторов
const validator = (
  fn: (value: any, formValues?: any, options?: any) => boolean | string
) => fn;

// Валидации по типу поля
// Числа:
export const isNumber = validator((value) => {
  if (value === "" || value === undefined) return true;
  const num = Number(value);
  return !isNaN(num) || "Введите корректное число";
});

export const isInteger = validator((value) => {
  if (value === "" || value === undefined) return true;
  const num = Number(value);
  return Number.isInteger(num) || "Должно быть целым числом";
});

export const nonNegative = validator((value) => {
  if (value === "" || value === undefined) return true;
  const num = Number(value);
  return num >= 0 || "Значение не может быть отрицательным";
});

export const minValue = (minVal: number) =>
  validator((value, _, options) => {
    if (value === "" || value === undefined) return true;

    const fieldName = options?.name || "значение";

    const num = Number(value);
    return num >= minVal || `${fieldName} должно быть не менее ${minVal}`;
  });

export const maxValue = (maxVal: number) =>
  validator((value, _, options) => {
    if (value === "" || value === undefined) return true;

    const fieldName = options?.name || "значение";

    const num = Number(value);
    return num <= maxVal || `${fieldName} должно быть не более ${maxVal}`;
  });

export const lessThanOther = (
  otherValue: string | number,
  otherFieldName?: string
) =>
  validator((value, _, options) => {
    if (
      value === "" ||
      value === undefined ||
      otherValue === "" ||
      otherValue === undefined
    )
      return true;

    // Получаем название поля из контекста или используем переданное
    const actualOtherFieldName =
      otherFieldName || options?.name || "максимального значения";

    const num = Number(value);
    const otherNum = Number(otherValue);
    return (
      num <= otherNum || `Значение не может быть больше ${actualOtherFieldName}`
    );
  });

export const greaterThanOther = (
  otherValue: string | number,
  otherFieldName?: string
) =>
  validator((value, _, options) => {
    if (
      value === "" ||
      value === undefined ||
      otherValue === "" ||
      otherValue === undefined
    )
      return true;

    // Получаем название поля из контекста или используем переданное
    const actualOtherFieldName =
      otherFieldName || options?.name || "минимального значения";

    const num = Number(value);
    const otherNum = Number(otherValue);
    return (
      num >= otherNum || `Значение не может быть меньше ${actualOtherFieldName}`
    );
  });

// Даты:
export const isValidDate = validator((value) => {
  if (value === "" || value === undefined) return true; // пустое значение разрешено

  const date = new Date(value);
  return !isNaN(date.getTime()) || "Введите корректную дату";
});

export const dateLessThanOther = (otherValue: string) =>
  validator((value) => {
    if (
      value === "" ||
      value === undefined ||
      otherValue === "" ||
      otherValue === undefined
    )
      return true;

    const date = new Date(value);
    const otherDate = new Date(otherValue);

    return (
      date <= otherDate || "Минимальная дата не может быть больше максимальной"
    );
  });

export const dateGreaterThanOther = (otherValue: string) =>
  validator((value) => {
    if (
      value === "" ||
      value === undefined ||
      otherValue === "" ||
      otherValue === undefined
    )
      return true;

    const date = new Date(value);
    const otherDate = new Date(otherValue);

    return (
      date >= otherDate || "Максимальная дата не может быть меньше минимальной"
    );
  });

// Специфические типизации
export const validNameAttribute = validator((value) => {
  if (value === "" || value === undefined) return true; // пустое значение разрешено

  // HTML name атрибут может содержать только:
  // - латинские буквы (a-z, A-Z)
  // - цифры (0-9)
  // - дефисы (-)
  // - подчеркивания (_)
  // - точки (.)
  // - двоеточия (:)
  const validNameRegex = /^[a-zA-Z0-9._:-]+$/;

  if (!validNameRegex.test(value)) {
    return "Имя поля может содержать только латинские буквы, цифры, дефисы, подчеркивания, точки и двоеточия";
  }

  // Дополнительно проверяем что не начинается с цифры
  if (/^[0-9]/.test(value)) {
    return "Имя поля не может начинаться с цифры";
  }

  return true;
});
