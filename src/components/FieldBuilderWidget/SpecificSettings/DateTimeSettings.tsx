import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";

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
            validate: (value: string) => {
              if (!value) return true; // Поле необязательное
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                return "Введите корректную дату";
              }

              // Проверяем, что минимальная дата не больше максимальной
              if (maxValue && new Date(value) > new Date(maxValue)) {
                return "Минимальная дата не может быть больше максимальной";
              }

              return true;
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
            validate: (value: string) => {
              if (!value) return true; // Поле необязательное
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                return "Введите корректную дату";
              }

              // Проверяем, что максимальная дата не меньше минимальной
              if (minValue && new Date(value) < new Date(minValue)) {
                return "Максимальная дата не может быть меньше минимальной";
              }

              return true;
            },
          })}
        />
      </FieldWrapper>
    </>
  );
};
