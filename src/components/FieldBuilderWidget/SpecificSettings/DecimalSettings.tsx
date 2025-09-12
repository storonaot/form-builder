import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";

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
              isNumber: (value) => {
                if (value === "" || value === undefined) return true;
                const num = Number(value);
                return !isNaN(num) || "Введите корректное число";
              },
              lessThanMax: (value) => {
                if (
                  value === "" ||
                  value === undefined ||
                  maximumValue === "" ||
                  maximumValue === undefined
                )
                  return true;
                const minNum = Number(value);
                const maxNum = Number(maximumValue);
                if (isNaN(minNum) || isNaN(maxNum)) return true;
                return (
                  minNum < maxNum ||
                  "Минимальное значение должно быть меньше максимального"
                );
              },
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
              isNumber: (value) => {
                if (value === "" || value === undefined) return true;
                const num = Number(value);
                return !isNaN(num) || "Введите корректное число";
              },
              greaterThanMin: (value) => {
                if (
                  value === "" ||
                  value === undefined ||
                  minimumValue === "" ||
                  minimumValue === undefined
                )
                  return true;
                const maxNum = Number(value);
                const minNum = Number(minimumValue);
                if (isNaN(maxNum) || isNaN(minNum)) return true;
                return (
                  maxNum > minNum ||
                  "Максимальное значение должно быть больше минимального"
                );
              },
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
              required: (value) => {
                if (value === "" || value === undefined) return true; // пустое значение разрешено
                return true;
              },
              isNumber: (value) => {
                if (value === "" || value === undefined) return true;
                const num = Number(value);
                return !isNaN(num) || "Введите корректное число";
              },
              isInteger: (value) => {
                if (value === "" || value === undefined) return true;
                const num = Number(value);
                return Number.isInteger(num) || "Должно быть целым числом";
              },
              min: (value) => {
                if (value === "" || value === undefined) return true;
                const num = Number(value);
                return num >= 0 || "Минимум 0 знаков";
              },
              max: (value) => {
                if (value === "" || value === undefined) return true;
                const num = Number(value);
                return num <= 10 || "Максимум 10 знаков";
              },
            },
          })}
          placeholder="2"
        />
      </FieldWrapper>
    </>
  );
};
