"use client";

import { Button } from "@/components/ui/button";
import { FieldType } from "../types";

interface FieldVariantSelectorProps {
  selectedType?: FieldType;
  onTypeChange?: (type: FieldType) => void;
}

const fieldTypes: { type: FieldType; label: string }[] = [
  {
    type: "string",
    label: "Текст",
  },
  {
    type: "integer",
    label: "Целое число",
  },
  {
    type: "decimal",
    label: "Десятичное число",
  },
  {
    type: "datetime",
    label: "Дата и время",
  },
];

export const FieldVariantSelector = ({
  selectedType,
  onTypeChange,
}: FieldVariantSelectorProps) => {
  const handleTypeSelect = (type: FieldType) => {
    if (onTypeChange) {
      onTypeChange(type);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {fieldTypes.map((field) => {
          const isSelected = selectedType === field.type;

          return (
            <Button
              key={field.type}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              className={`px-3 py-1 h-7 text-xs ${
                isSelected
                  ? "bg-slate-800 hover:bg-slate-900 text-white"
                  : "bg-white hover:bg-slate-50"
              }`}
              style={{ transition: "none" }}
              onClick={() => handleTypeSelect(field.type)}
            >
              {field.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
