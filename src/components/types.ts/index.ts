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
  decimalPlaces?: number;
};

export type IntegerFieldSchema = BaseFieldSchema & {
  type: "integer";
  min?: number;
  max?: number;
};

export type DateTimeFieldSchema = BaseFieldSchema & {
  type: "datetime";
};

export type FieldSchema =
  | StringFieldSchema
  | DecimalFieldSchema
  | IntegerFieldSchema
  | DateTimeFieldSchema;

export type FormSettings = {
  id: string;
  name: string;
  description: string;
  fields: FieldSchema[];
  createdAt: string;
};

// Типы для хук формы
export type FieldHookForm<T extends string = string> = ControllerRenderProps<
  Record<string, any>,
  T
>;

// Для настроек полей (без id) - используется в формах создания
export type FieldSettings = Omit<BaseFieldSchema, "id">;
