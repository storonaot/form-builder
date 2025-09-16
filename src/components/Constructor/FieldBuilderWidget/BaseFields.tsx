import { getErrorMessage } from "@/lib/form-utils";
import { FieldWrapper } from "../../ui/FieldWrapper";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { validNameAttribute } from "../../../lib/validators";

export const BaseFields = () => {
  const { control, formState } = useFormContext();

  return (
    <>
      <FieldWrapper
        htmlFor="name"
        label="Имя поля"
        errorMsg={getErrorMessage(formState.errors, "name")}
        required={true}
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Имя поля обязательно",
            validate: {
              validNameAttribute,
            },
          }}
          render={({ field }) => (
            <Input
              id="name"
              error={Boolean(getErrorMessage(formState.errors, "name"))}
              {...field}
              placeholder="Введите имя поля (например: email, phone)"
            />
          )}
        />
      </FieldWrapper>

      <FieldWrapper
        htmlFor="label"
        label="Лейбл"
        errorMsg={getErrorMessage(formState.errors, "label")}
      >
        <Controller
          name="label"
          control={control}
          render={({ field }) => (
            <Input
              id="label"
              error={Boolean(getErrorMessage(formState.errors, "label"))}
              {...field}
              placeholder="Введите название поля"
            />
          )}
        />
      </FieldWrapper>
    </>
  );
};
