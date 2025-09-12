import { FieldErrors, FieldValues } from "react-hook-form";

export const getErrorMessage = <T extends FieldValues>(
  errors: FieldErrors<T>,
  name: keyof T
): string | undefined => {
  const error = errors[name];
  return error?.message as string | undefined;
};
