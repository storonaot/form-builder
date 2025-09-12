import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";

export const StringSettings = () => {
  const { register, formState } = useFormContext();

  return (
    <>
      <FieldWrapper
        htmlFor="minLength"
        label="Мин. длина"
        errorMsg={getErrorMessage(formState.errors, "minLength")}
      >
        <Input
          id="minLength"
          type="text"
          error={Boolean(getErrorMessage(formState.errors, "minLength"))}
          {...register("minLength", {
            validate: {
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
                return (
                  num >= 0 || "Минимальная длина не может быть отрицательной"
                );
              },
            },
          })}
          placeholder="0"
        />
      </FieldWrapper>
      <FieldWrapper
        label="Макс. длина"
        htmlFor="maxLength"
        errorMsg={getErrorMessage(formState.errors, "maxLength")}
      >
        <Input
          id="maxLength"
          type="text"
          error={Boolean(getErrorMessage(formState.errors, "maxLength"))}
          {...register("maxLength", {
            validate: {
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
                return num >= 1 || "Максимальная длина должна быть больше 0";
              },
            },
          })}
          placeholder="100"
        />
      </FieldWrapper>
    </>
  );
};
