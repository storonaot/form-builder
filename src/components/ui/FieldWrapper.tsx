import { Label } from "@radix-ui/react-label";
import { FC, PropsWithChildren } from "react";

type FieldWrapperProps = PropsWithChildren<{
  label: string;
  htmlFor: string;
}>;

export const FieldWrapper: FC<FieldWrapperProps> = ({
  children,
  label,
  errors,
  htmlFor,
}) => {
  return (
    <div>
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      <div>{children}</div>
      {errors?.minLength && (
        <p className="text-xs text-red-500">{errors.minLength.message}</p>
      )}
    </div>
  );
};
