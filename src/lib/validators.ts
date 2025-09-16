// Упрощенная функция для создания валидаторов
const validator = (
  // TODO: Заменить any на более конкретные типы для value, formValues, options
  // @ts-ignore
  fn: (value: any, formValues?: any, options?: any) => boolean | string
) => fn;

export const required = (message?: string) =>
  validator((value) => {
    return (
      (value !== "" && value !== undefined && value !== null) ||
      message ||
      "Поле обязательно для заполнения"
    );
  });

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

// Числа с плавающей точкой:
export const decimalPlaces = (maxPlaces: number) =>
  validator((value) => {
    if (value === "" || value === undefined) return true;
    const decimalPart = value.split(".")[1];
    const actualPlaces = decimalPart ? decimalPart.length : 0;
    return (
      actualPlaces <= maxPlaces || `Не более ${maxPlaces} знаков после запятой`
    );
  });

// Строки:
export const minLength = (minLen: number) =>
  validator((value) => {
    if (value === "" || value === undefined) return true;
    return value.length >= minLen || `Минимальная длина: ${minLen} символов`;
  });
export const maxLength = (maxLen: number) =>
  validator((value) => {
    if (value === "" || value === undefined) return true;
    return value.length <= maxLen || `Максимальная длина: ${maxLen} символов`;
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

export const minDate = (minDateValue: string) =>
  validator((value) => {
    if (value === "" || value === undefined) return true;
    return (
      new Date(value) >= new Date(minDateValue) || "Дата раньше минимальной"
    );
  });
export const maxDate = (maxDateValue: string) =>
  validator((value) => {
    if (value === "" || value === undefined) return true;
    return (
      new Date(value) <= new Date(maxDateValue) || "Дата позже максимальной"
    );
  });

// Специфические валидации
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
