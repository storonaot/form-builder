"use client";

import { FC, PropsWithChildren } from "react";
import { Button } from "../../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { FieldSchema } from "../types.js";

type Props = PropsWithChildren<{
  field: FieldSchema;
  isEditing?: boolean;
  isDisabled?: boolean;
  onEdit: (field: FieldSchema) => void;
  onDelete: (field: FieldSchema) => void;
  className?: string;
}>;

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
    <div
      className={`flex items-center gap-4 transition-all duration-200 ${
        isDisabled && !isEditing ? "opacity-50 pointer-events-none" : ""
      } ${
        isEditing
          ? "bg-green-50 p-3 rounded-lg border-2 border-green-300 relative"
          : ""
      } ${className}`}
    >
      {/* Поле формы - занимает доступное пространство */}
      <div className="flex-1">{children}</div>

      {/* Кнопки действий - справа на том же уровне */}
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
  );
};
