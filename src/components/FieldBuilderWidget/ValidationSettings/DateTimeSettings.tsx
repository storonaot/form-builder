import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";
import {
  dateGreaterThanOther,
  dateLessThanOther,
  isValidDate,
} from "../validators";

export const DateTimeSettings = () => {
  const { register, formState, watch } = useFormContext();

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
        <Input
          id="min"
          type="datetime-local"
          error={Boolean(getErrorMessage(formState.errors, "min"))}
          {...register("min", {
            validate: {
              isValidDate,
              dateLessThanOther: dateLessThanOther(maxValue),
            },
          })}
        />
      </FieldWrapper>
      <FieldWrapper
        htmlFor="max"
        label="Макс. дата"
        errorMsg={getErrorMessage(formState.errors, "max")}
      >
        <Input
          id="max"
          type="datetime-local"
          error={Boolean(getErrorMessage(formState.errors, "max"))}
          {...register("max", {
            validate: {
              isValidDate,
              dateGreaterThanOther: dateGreaterThanOther(minValue),
            },
          })}
        />
      </FieldWrapper>
    </>
  );
};
