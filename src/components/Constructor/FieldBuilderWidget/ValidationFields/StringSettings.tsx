import { FieldWrapper } from "@/components/ui/FieldWrapper";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/form-utils";
import { useFormContext } from "react-hook-form";
import {
  isNumber,
  isInteger,
  nonNegative,
  lessThanOther,
  greaterThanOther,
} from "../../../../lib/validators";

export const StringSettings = () => {
  const { register, formState, watch } = useFormContext();

  // Следим за значениями полей для валидации
  const minLengthValue = watch("minLength");
  const maxLengthValue = watch("maxLength");

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
              isNumber,
              isInteger,
              nonNegative,
              maxLengthCheck: lessThanOther(maxLengthValue),
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
              isNumber,
              isInteger,
              nonNegative,
              minLengthCheck: greaterThanOther(minLengthValue),
            },
          })}
          placeholder="100"
        />
      </FieldWrapper>
    </>
  );
};
