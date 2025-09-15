import { FieldHookForm, FieldSchema } from "@/components/types.ts";
import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { FC } from "react";

type Props = {
  field: FieldSchema;
  controllerProps: FieldHookForm;
  error?: string;
  disabled?: boolean;
};

export const FieldRenderer: FC<Props> = ({
  field,
  controllerProps,
  error,
  disabled,
}) => {
  const renderField = () => {
    switch (field.type) {
      case "string":
        return (
          <Input
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Введите текст"
            disabled={disabled}
          />
        );
      case "integer":
        return (
          <Input
            type="number"
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Введите целое число"
            disabled={disabled}
          />
        );
      case "decimal":
        return (
          <Input
            type="number"
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Введите десятичное число"
            disabled={disabled}
          />
        );
      case "datetime":
        return (
          <Input
            type="datetime-local"
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Выберите дату и время"
            disabled={disabled}
          />
        );
      default:
        return (
          <Input
            onChange={controllerProps.onChange}
            value={controllerProps.value || ""}
            placeholder="Неизвестный тип поля"
            disabled={disabled}
          />
        );
    }
  };

  return (
    <FieldWrapper
      label={field.label}
      htmlFor={field.name}
      errorMsg={error}
      required={field.required}
    >
      {renderField()}
    </FieldWrapper>
  );
};
