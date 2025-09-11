"use client";

import { Button } from "@/components/ui/button";
import { ConfirmationGuard } from "@/components/ui/confirmation-guard";

export type FieldType = "string" | "integer" | "decimal" | "datetime";

interface FieldVariantSelectorProps {
  selectedType?: FieldType;
  onTypeChange?: (type: FieldType) => void;
  hasUnsavedData?: boolean;
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
  hasUnsavedData = false,
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
          const needsConfirmation =
            hasUnsavedData && !isSelected && selectedType !== null;

          return (
            <ConfirmationGuard
              key={field.type}
              isDirty={needsConfirmation}
              onConfirm={() => handleTypeSelect(field.type)}
              title="Переключение типа поля"
              description="У вас есть несохраненные настройки поля. Если вы переключите тип поля, текущие настройки будут потеряны."
              confirmText="Подтвердить сброс настроек поля"
              cancelText="Отмена"
            >
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`px-3 py-1 h-7 text-xs ${
                  isSelected
                    ? "bg-slate-800 hover:bg-slate-900 text-white"
                    : "bg-white hover:bg-slate-50"
                }`}
                style={{ transition: "none" }}
              >
                {field.label}
              </Button>
            </ConfirmationGuard>
          );
        })}
      </div>
    </div>
  );
};
