import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";
import {
  isInteger,
  isNumber,
  lessThanOther,
  greaterThanOther,
} from "../validators";

export const IntegerSettings = () => {
  const { register, formState, watch } = useFormContext();

  // Следим за значениями полей для валидации
  const minValue = watch("min");
  const maxValue = watch("max");

  return (
    <>
      <FieldWrapper
        htmlFor="min"
        label="Мин. значение"
        errorMsg={getErrorMessage(formState.errors, "min")}
      >
        <Input
          id="min"
          type="text"
          error={Boolean(getErrorMessage(formState.errors, "min"))}
          {...register("min", {
            validate: {
              isNumber,
              isInteger,
              lessThanMax: lessThanOther(maxValue),
            },
          })}
          placeholder="0"
        />
      </FieldWrapper>
      <FieldWrapper
        htmlFor="max"
        label="Макс. значение"
        errorMsg={getErrorMessage(formState.errors, "max")}
      >
        <Input
          id="max"
          type="text"
          error={Boolean(getErrorMessage(formState.errors, "max"))}
          {...register("max", {
            validate: {
              isNumber,
              isInteger,
              greaterThanMin: greaterThanOther(minValue),
            },
          })}
          placeholder="100"
        />
      </FieldWrapper>
    </>
  );
};
