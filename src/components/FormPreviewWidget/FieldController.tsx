import { FC } from "react";
import { FieldSchema, FieldType } from "../types.ts";
import { Controller, useFormContext } from "react-hook-form";
import { FieldRenderer } from "./FieldRenderer";

type Props = {
  field: FieldSchema;
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
          required={field.required}
          controllerProps={controllerProps.field}
        />
      )}
    />
  );
};
