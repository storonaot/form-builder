import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type SelectFieldProps<TValue extends string = string> = {
  value: TValue;
  onValueChange: (value: TValue) => void;
  placeholder: string;
  options: { value: TValue; label: string }[];
};

export const SelectField = <TValue extends string = string>({
  value,
  onValueChange,
  placeholder,
  options,
}: SelectFieldProps<TValue>) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
