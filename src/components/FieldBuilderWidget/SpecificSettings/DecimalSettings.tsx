import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";

export const DecimalSettings = () => {
  const { register, formState } = useFormContext();

  return (
    <>
      <FieldWrapper
        htmlFor="decimalPlaces"
        label="Знаков после запятой"
        errorMsg={getErrorMessage(formState.errors, "decimalPlaces")}
      >
        <Input
          id="decimalPlaces"
          type="number"
          min="0"
          max="10"
          {...register("decimalPlaces", {
            valueAsNumber: true,
          })}
          placeholder="2"
        />
      </FieldWrapper>
    </>
  );
};
