import { FC } from "react";
import { FieldSchema, FieldType } from "../types.ts";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Input } from "../ui/input";
import { FieldWrapper } from "../ui/FieldWrapper";

type Props = {
  field: FieldSchema;
};

export type FieldHookForm<T extends string = string> = ControllerRenderProps<
  Record<string, any>,
  T
>;

type FieldRendererProps = {
  fieldType: FieldType;
  label: string;
  name: string;
  controllerProps: FieldHookForm;
};

const FieldRenderer: FC<FieldRendererProps> = ({
  fieldType,
  label,
  name,
  controllerProps,
}) => {
  const renderField = () => {
    switch (fieldType) {
      case "string":
        return (
          <Input
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Введите текст"
          />
        );
      case "integer":
        return (
          <Input
            type="number"
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Введите целое число"
            step="1"
          />
        );
      case "decimal":
        return (
          <Input
            type="number"
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Введите десятичное число"
            step="0.01"
          />
        );
      case "datetime":
        return (
          <Input
            type="datetime-local"
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Выберите дату и время"
          />
        );
      default:
        return (
          <Input
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Неизвестный тип поля"
          />
        );
    }
  };

  return (
    <FieldWrapper label={label} htmlFor={name}>
      {renderField()}
    </FieldWrapper>
  );
};

export const FieldController: FC<Props> = ({ field }) => {
  const formContext = useFormContext();

  return (
    <Controller
      name={field.name}
      control={formContext.control}
      render={(controllerProps) => (
        <FieldRenderer
          fieldType={field.type}
          label={field.label}
          name={field.name}
          controllerProps={controllerProps.field}
        />
      )}
    />
  );
};
