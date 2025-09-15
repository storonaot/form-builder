import { FC } from "react";
import { FieldSchema } from "../types.ts";
import { Controller, useFormContext } from "react-hook-form";
import { FieldRenderer } from "./FieldRenderer";
import { getValidationRules } from "./get-validation-rules";

type Props = {
  field: FieldSchema;
};

export const FieldController: FC<Props> = ({ field }) => {
  const formContext = useFormContext();

  return (
    <Controller
      name={field.name}
      control={formContext.control}
      rules={getValidationRules(field)}
      render={(controllerProps) => (
        <FieldRenderer
          field={field}
          controllerProps={controllerProps.field}
          error={controllerProps.fieldState.error?.message}
          disabled={controllerProps.field.disabled}
        />
      )}
    />
  );
};
