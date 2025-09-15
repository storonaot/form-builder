"use client";

import { FC, PropsWithChildren, ReactNode } from "react";
import { FieldSchema } from "../../types.ts/index.js";
import { Button } from "../../ui/button";
import { Edit } from "lucide-react";

type Props = PropsWithChildren<{
  field: FieldSchema;
  isEditing?: boolean;
  isDisabled?: boolean;
  onEdit?: (field: FieldSchema) => void;
  className?: string;
}>;

export const ConstructorFieldWrapper: FC<Props> = ({
  field,
  isEditing = false,
  isDisabled = false,
  onEdit,
  className = "",
  children,
}) => {
  return (
    <div
      className={`flex items-start gap-2 transition-all duration-200 ${
        isDisabled && !isEditing ? "opacity-50 pointer-events-none" : ""
      } ${
        isEditing
          ? "bg-red-50 p-3 rounded-lg border-2 border-red-300 relative"
          : ""
      } ${className}`}
    >
      {isEditing && (
        <div className="absolute -top-3 left-2 bg-white text-red-500 text-xs px-2 py-1 rounded border border-red-300 shadow-sm">
          Редактируется
        </div>
      )}
      <div className="flex-1">{children}</div>
      {onEdit && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-6 h-8 w-8 p-0"
          disabled={isDisabled}
          onClick={() => onEdit(field)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
