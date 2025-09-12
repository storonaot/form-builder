import { FC } from "react";
import { FieldSchema, FieldType } from "../types.ts";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { FieldRenderer } from "./FieldRenderer";

type Props = {
  field: FieldSchema;
  validationRules?: RegisterOptions;
};

export const FieldController: FC<Props> = ({ field, validationRules }) => {
  const formContext = useFormContext();

  return (
    <Controller
      name={field.name}
      control={formContext.control}
      rules={validationRules}
      render={(controllerProps) => (
        <FieldRenderer
          fieldType={field.type}
          label={field.label}
          name={field.name}
          required={field.required}
          controllerProps={controllerProps.field}
          error={controllerProps.fieldState.error?.message}
        />
      )}
    />
  );
};
