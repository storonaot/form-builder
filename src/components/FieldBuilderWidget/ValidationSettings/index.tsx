import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StringSettings } from "./StringSettings";
import { IntegerSettings } from "./IntegerSettings";
import { DecimalSettings } from "./DecimalSettings";
import { DateTimeSettings } from "./DateTimeSettings";
import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Switch } from "@/components/ui/switch";
import { getErrorMessage } from "@/lib/form-utils";
import { FieldType } from "@/components/types.ts";

type Props = {
  fieldType: FieldType;
};

export const ValidationSettings: FC<Props> = ({ fieldType }) => {
  const { control, formState } = useFormContext();

  const renderSpecificSettings = () => {
    switch (fieldType) {
      case "string":
        return <StringSettings />;
      case "integer":
        return <IntegerSettings />;
      case "decimal":
        return <DecimalSettings />;
      case "datetime":
        return <DateTimeSettings />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Общие настройки для всех типов полей */}
      <FieldWrapper
        htmlFor="required"
        label="Обязательное поле"
        errorMsg={getErrorMessage(formState.errors, "required")}
      >
        <Controller
          name="required"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </FieldWrapper>

      {/* Специфичные настройки для каждого типа поля */}
      {renderSpecificSettings()}
    </>
  );
};
