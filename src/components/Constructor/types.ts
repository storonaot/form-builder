import { ControllerRenderProps } from "react-hook-form";

export type FieldType = "string" | "integer" | "decimal" | "datetime";

export type BaseFieldSchema = {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  required: boolean;
};

export type StringFieldSchema = BaseFieldSchema & {
  type: "string";
  minLength?: number;
  maxLength?: number;
};

export type DecimalFieldSchema = BaseFieldSchema & {
  type: "decimal";
  minimum?: number;
  maximum?: number;
  decimalPlaces?: number; // количество знаков после запятой
};

export type IntegerFieldSchema = BaseFieldSchema & {
  type: "integer";
  min?: number;
  max?: number;
};

export type DateTimeFieldSchema = BaseFieldSchema & {
  type: "datetime";
  min?: string; // ISO string для минимальной даты
  max?: string; // ISO string для максимальной даты
};

export type FieldSchema =
  | StringFieldSchema
  | DecimalFieldSchema
  | IntegerFieldSchema
  | DateTimeFieldSchema;

export type FormSchema = {
  id: string;
  name: string;
  description: string;
  fields: FieldSchema[];
};

// Типы для хук формы
export type FieldHookForm<T extends string = string> = ControllerRenderProps<
  // TODO: сузить тип
  // @ts-ignore
  Record<string, any>,
  T
>;

// Для настроек полей (без id) - используется в формах создания
export type FieldSettings = Omit<FieldSchema, "id">;

// TODO: сузить тип
// @ts-ignore
export type FormDataCustom = Record<string, any>;
