"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// Убираем импорт иконок

export type FieldType = "string" | "integer" | "decimal" | "datetime";

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
  const [internalSelectedType, setInternalSelectedType] =
    useState<FieldType | null>(null);

  const currentSelectedType = selectedType || internalSelectedType;

  const handleTypeSelect = (type: FieldType) => {
    if (onTypeChange) {
      onTypeChange(type);
    } else {
      setInternalSelectedType(type);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {fieldTypes.map((field) => (
          <Button
            key={field.type}
            variant={currentSelectedType === field.type ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeSelect(field.type)}
            className={`px-3 py-1 h-7 text-xs ${
              currentSelectedType === field.type
                ? "bg-slate-800 hover:bg-slate-900 text-white"
                : "bg-white hover:bg-slate-50"
            }`}
            style={{ transition: "none" }}
          >
            {field.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
