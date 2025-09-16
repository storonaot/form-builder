"use client";

import { FC, PropsWithChildren } from "react";
import { Edit, Trash2 } from "lucide-react";
import { ValidationList } from "./ValidationList";
import { Button } from "@/components/ui/button";
import { FieldSchema } from "../../types";
import { Separator } from "@/components/ui/separator";

type Props = PropsWithChildren<{
  field: FieldSchema;
  isEditing?: boolean;
  isDisabled?: boolean;
  onEdit: (field: FieldSchema) => void;
  onDelete: (field: FieldSchema) => void;
  className?: string;
}>;

const getFieldTypeLabel = (type: FieldSchema["type"]) => {
  const labels = {
    string: "Текст",
    integer: "Число",
    decimal: "Десятичное",
    datetime: "Дата/время",
  };
  return labels[type];
};

export const ConstructorFieldWrapper: FC<Props> = ({
  field,
  isEditing = false,
  isDisabled = false,
  onEdit,
  onDelete,
  className = "",
  children,
}) => {
  return (
    <>
      <div
        className={`flex items-center gap-4 transition-all duration-200 ${
          isDisabled && !isEditing ? "opacity-50 pointer-events-none" : ""
        } ${
          isEditing
            ? "bg-green-50 p-3 rounded-lg border-2 border-green-300 relative"
            : ""
        } ${className}`}
      >
        {/* Тип поля - фиксированная ширина */}
        <div className="w-24 flex-shrink-0">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {getFieldTypeLabel(field.type)}
          </span>
        </div>

        {/* Поле формы - растягивается */}
        <div className="flex-1">{children}</div>

        {/* Валидации и кнопки - фиксированная ширина */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <ValidationList field={field} />

          {/* Кнопки действий */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={isDisabled}
              onClick={() => onEdit(field)}
              title="Редактировать поле"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={isDisabled}
              onClick={() => onDelete(field)}
              title="Удалить поле"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
    </>
  );
};
