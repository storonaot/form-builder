import { Label } from "@radix-ui/react-label";
import { FC, PropsWithChildren } from "react";

type FieldWrapperProps = PropsWithChildren<{
  label: string;
  htmlFor: string;
  errorMsg?: string;
}>;

export const FieldWrapper: FC<FieldWrapperProps> = ({
  children,
  label,
  errorMsg,
  htmlFor,
}) => {
  return (
    <div>
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      <div>{children}</div>
      {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
    </div>
  );
};
