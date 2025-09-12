import { FC } from "react";
import { FieldSchema, FieldType } from "../types.ts";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { FieldWrapper } from "../ui/FieldWrapper";

type Props = {
  field: FieldSchema;
};

const FieldRenderer: FC<{
  fieldType: FieldType;
  label: string;
  name: string;
}> = ({ fieldType, label, name }) => {
  const renderField = () => {
    switch (fieldType) {
      case "string":
        return <Input name={name} />;
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
        />
      )}
    />
  );
};
