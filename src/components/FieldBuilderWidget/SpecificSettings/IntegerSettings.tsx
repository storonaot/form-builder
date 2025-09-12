import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const IntegerSettings = () => {
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
          {...register("min", {
            valueAsNumber: true,
            validate: (value: number) =>
              !isNaN(value) || "Введите корректное число",
          })}
          placeholder="0"
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
          {...register("max", {
            valueAsNumber: true,
            validate: (value: number) =>
              !isNaN(value) || "Введите корректное число",
          })}
          placeholder="100"
        />
      </FieldWrapper>
    </>
  );
};
