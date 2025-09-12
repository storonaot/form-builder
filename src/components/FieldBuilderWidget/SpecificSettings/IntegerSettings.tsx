import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";

export const IntegerSettings = () => {
  const { register, formState } = useFormContext();

  return (
    <>
      <FieldWrapper
        htmlFor="min"
        label="Мин. значение"
        errorMsg={getErrorMessage(formState.errors, "min")}
      >
        <Input
          id="min"
          type="number"
          {...register("min", {
            valueAsNumber: true,
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
          type="number"
          {...register("max", {
            valueAsNumber: true,
          })}
          placeholder="100"
        />
      </FieldWrapper>
    </>
  );
};
