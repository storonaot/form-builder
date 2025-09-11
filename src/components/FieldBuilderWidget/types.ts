// Базовый интерфейс с общими полями
export interface BaseField {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
  required: boolean;
  defaultValue?: string;
}

// Специфичные интерфейсы для каждого типа
export interface StringField extends BaseField {
  type: "string";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface IntegerField extends BaseField {
  type: "integer";
  min?: number;
  max?: number;
}

export interface DecimalField extends BaseField {
  type: "decimal";
  min?: number;
  max?: number;
  step?: number;
}

export interface DateTimeField extends BaseField {
  type: "datetime";
  min?: string;
  max?: string;
}

// Union тип для всех полей
export type Field = StringField | IntegerField | DecimalField | DateTimeField;

// Для настроек полей (без id)
export type FieldSettings = Omit<Field, "id">;

// Для типов полей
export type FieldType = Field["type"];

// Оставляем старый интерфейс для совместимости (можно будет удалить позже)
export interface FieldSettingsData {
  label: string;
  hint?: string;
  required: boolean;
  errorMessage?: string;
  defaultValue?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
}
