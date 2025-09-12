import { Label } from "@radix-ui/react-label";
import { FC, PropsWithChildren } from "react";

type FieldWrapperProps = PropsWithChildren<{
  label: string;
  htmlFor: string;
  errorMsg?: string;
  required?: boolean;
}>;

export const FieldWrapper: FC<FieldWrapperProps> = ({
  children,
  label,
  errorMsg,
  htmlFor,
  required,
}) => {
  return (
    <div>
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div>{children}</div>
      {errorMsg && <p className="text-xs text-red-500 mt-1">{errorMsg}</p>}
    </div>
  );
};
