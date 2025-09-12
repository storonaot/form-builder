import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const DateTimeSettings = () => {
  const { register, formState } = useFormContext();

  return (
    <>
      <FieldWrapper
        htmlFor="min"
        label="Мин. дата"
        errors={formState.errors.min}
      >
        <Input
          id="min"
          type="datetime-local"
          {...register("min", {
            validate: (value: string) => {
              if (!value) return true; // Поле необязательное
              const date = new Date(value);
              return !isNaN(date.getTime()) || "Введите корректную дату";
            },
          })}
        />
      </FieldWrapper>
      <FieldWrapper
        htmlFor="max"
        label="Макс. дата"
        errors={formState.errors.max}
      >
        <Input
          id="max"
          type="datetime-local"
          {...register("max", {
            validate: (value: string) => {
              if (!value) return true; // Поле необязательное
              const date = new Date(value);
              return !isNaN(date.getTime()) || "Введите корректную дату";
            },
          })}
        />
      </FieldWrapper>
    </>
  );
};
