import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";
import {
  greaterThanOther,
  isInteger,
  isNumber,
  lessThanOther,
  maxValue,
  nonNegative,
} from "../../../../lib/validators";

const MAX_DECIMAL_PLACES = 10;

export const DecimalSettings = () => {
  const { register, formState, watch } = useFormContext();

  // Следим за значениями полей для валидации
  const minimumValue = watch("minimum");
  const maximumValue = watch("maximum");

  return (
    <>
      <FieldWrapper
        htmlFor="minimum"
        label="Минимальное значение"
        errorMsg={getErrorMessage(formState.errors, "minimum")}
      >
        <Input
          id="minimum"
          type="text"
          error={Boolean(getErrorMessage(formState.errors, "minimum"))}
          {...register("minimum", {
            validate: {
              isNumber,
              lessThanOther: lessThanOther(
                maximumValue,
                "максимального значения"
              ),
            },
          })}
          placeholder="0"
        />
      </FieldWrapper>

      <FieldWrapper
        htmlFor="maximum"
        label="Максимальное значение"
        errorMsg={getErrorMessage(formState.errors, "maximum")}
      >
        <Input
          id="maximum"
          type="text"
          error={Boolean(getErrorMessage(formState.errors, "maximum"))}
          {...register("maximum", {
            validate: {
              isNumber,
              greaterThanOther: greaterThanOther(minimumValue),
            },
          })}
          placeholder="100"
        />
      </FieldWrapper>

      <FieldWrapper
        htmlFor="decimalPlaces"
        label="Знаков после запятой"
        errorMsg={getErrorMessage(formState.errors, "decimalPlaces")}
      >
        <Input
          id="decimalPlaces"
          type="text"
          error={Boolean(getErrorMessage(formState.errors, "decimalPlaces"))}
          {...register("decimalPlaces", {
            validate: {
              isNumber,
              isInteger,
              nonNegative,
              maxValue: maxValue(MAX_DECIMAL_PLACES),
            },
          })}
          placeholder="2"
        />
      </FieldWrapper>
    </>
  );
};
