export type FieldType = "string" | "integer" | "decimal" | "datetime";

export type FieldSettingsData = {
  id: string;
  type: FieldType;
  label: string;
};

export type FormSettings = {
  id: string;
  name: string;
  description: string;
  fields: FieldSettingsData[];
  createdAt: string;
};

// Базовый интерфейс с общими полями
// export interface BaseField {
//   id: string;
//   name: string;
//   label: string;
//   placeholder?: string;
//   hint?: string;
//   required: boolean;
// }

// // Специфичные интерфейсы для каждого типа
// export interface StringField extends BaseField {
//   type: "string";
//   minLength?: number;
//   maxLength?: number;
//   pattern?: string;
// }

// export interface IntegerField extends BaseField {
//   type: "integer";
//   min?: number;
//   max?: number;
// }

// export interface DecimalField extends BaseField {
//   type: "decimal";
//   min?: number;
//   max?: number;
//   step?: number;
// }

// export interface DateTimeField extends BaseField {
//   type: "datetime";
//   min?: string;
//   max?: string;
// }

// Union тип для всех полей
// export type Field = StringField | IntegerField | DecimalField | DateTimeField;

// Для настроек полей (без id)
// export type FieldSettings = Omit<Field, "id">;

// Для типов полей
