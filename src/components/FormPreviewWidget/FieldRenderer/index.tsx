import { FieldHookForm, FieldType } from "@/components/types.ts";
import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { FC } from "react";

type Props = {
  fieldType: FieldType;
  label: string;
  name: string;
  required: boolean;
  controllerProps: FieldHookForm;
  error?: string;
};

export const FieldRenderer: FC<Props> = ({
  fieldType,
  label,
  name,
  required,
  controllerProps,
  error,
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
    <FieldWrapper label={label} htmlFor={name} errorMsg={error}>
      {renderField()}
    </FieldWrapper>
  );
};
