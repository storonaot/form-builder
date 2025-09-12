import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const DecimalSettings = () => {
  const { register, formState } = useFormContext();

  return (
    <>
      <FieldWrapper
        htmlFor="min"
        label="Мин. значение"
        errors={formState.errors.min}
      >
        <Input
          id="min"
          type="number"
          step="0.01"
          {...register("min", {
            valueAsNumber: true,
            validate: (value: number) =>
              !isNaN(value) || "Введите корректное число",
          })}
          placeholder="0.00"
        />
      </FieldWrapper>
      <FieldWrapper
        htmlFor="max"
        label="Макс. значение"
        errors={formState.errors.max}
      >
        <Input
          id="max"
          type="number"
          step="0.01"
          {...register("max", {
            valueAsNumber: true,
            validate: (value: number) =>
              !isNaN(value) || "Введите корректное число",
          })}
          placeholder="100.00"
        />
      </FieldWrapper>
    </>
  );
};
