import { FC } from "react";
import { FieldSchema } from "../types.ts";
import { Controller, useFormContext } from "react-hook-form";
import { FieldRenderer } from "./FieldRenderer";
import { getValidationRules } from "./helpers";

type Props = {
  field: FieldSchema;
  disabled?: boolean;
};

export const FieldController: FC<Props> = ({ field, disabled }) => {
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
          disabled={disabled}
        />
      )}
    />
  );
};
