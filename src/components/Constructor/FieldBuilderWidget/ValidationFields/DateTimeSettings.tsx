import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { Controller, useFormContext } from "react-hook-form";
import {
  dateGreaterThanOther,
  dateLessThanOther,
  isValidDate,
} from "../../../../lib/validators";

export const DateTimeSettings = () => {
  const { control, formState, watch } = useFormContext();

  // Следим за значениями полей для валидации
  const minValue = watch("min");
  const maxValue = watch("max");

  return (
    <>
      <FieldWrapper
        htmlFor="min"
        label="Мин. дата"
        errorMsg={getErrorMessage(formState.errors, "min")}
      >
        <Controller
          name="min"
          control={control}
          defaultValue=""
          rules={{
            validate: {
              isValidDate,
              dateLessThanOther: dateLessThanOther(maxValue),
            },
          }}
          render={({ field }) => (
            <Input
              id="min"
              type="datetime-local"
              error={Boolean(getErrorMessage(formState.errors, "min"))}
              {...field}
            />
          )}
        />
      </FieldWrapper>
      <FieldWrapper
        htmlFor="max"
        label="Макс. дата"
        errorMsg={getErrorMessage(formState.errors, "max")}
      >
        <Controller
          name="max"
          control={control}
          defaultValue=""
          rules={{
            validate: {
              isValidDate,
              dateGreaterThanOther: dateGreaterThanOther(minValue),
            },
          }}
          render={({ field }) => (
            <Input
              id="max"
              type="datetime-local"
              error={Boolean(getErrorMessage(formState.errors, "max"))}
              {...field}
            />
          )}
        />
      </FieldWrapper>
    </>
  );
};
