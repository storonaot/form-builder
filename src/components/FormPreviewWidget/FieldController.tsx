import { FC } from "react";
import { FieldSchema, FieldType } from "../types.ts";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  field: FieldSchema;
};

const FieldRenderer: FC<{
  fieldType: FieldType;
  label: string;
  name: string;
}> = ({ fieldType, label, name }) => {
  return (
    <div>
      <div>{label}</div>
      <div>{fieldType}</div>
      <div>{name}</div>
    </div>
  );
};

export const FieldController: FC<Props> = ({ field }) => {
  const formContext = useFormContext();

  // Проверяем, что поле name существует
  if (!field.name) {
    console.error("Field name is missing:", field);
    return <div>Ошибка: поле не имеет имени</div>;
  }

  return (
    <Controller
      name={field.name}
      control={formContext.control}
      render={(controllerProps) => (
        <FieldRenderer
          fieldType={field.type}
          label={field.label}
          name={field.name}
        />
      )}
    />
  );
};
