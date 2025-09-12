import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const StringSettings = () => {
  const { register, formState } = useFormContext();

  return (
    <>
      <FieldWrapper
        htmlFor="minLength"
        label="Мин. длина"
        errors={formState.errors.minLength}
      >
        <Input
          id="minLength"
          type="number"
          {...register("minLength", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Минимальная длина не может быть отрицательной",
            },
          })}
          placeholder="0"
        />
      </FieldWrapper>
      <FieldWrapper
        label="Макс. длина"
        htmlFor="maxLength"
        errors={formState.errors.maxLength}
      >
        <Input
          id="maxLength"
          type="number"
          {...register("maxLength", {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Максимальная длина должна быть больше 0",
            },
          })}
          placeholder="100"
        />
      </FieldWrapper>
    </>
  );
};
