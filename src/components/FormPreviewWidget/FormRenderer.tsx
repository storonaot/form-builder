import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FieldSchema } from "../types.ts";
import { FC } from "react";
import { FieldController } from "./FieldController";
import { Edit } from "lucide-react";

type Props = {
  fields: FieldSchema[];
  onSuccess: <T>(data: T) => void;
  editingFieldId?: string;
  onEditField?: (field: FieldSchema) => void;
  onCancelEdit?: () => void;
};

export const FormRenderer: FC<Props> = ({
  fields,
  onSuccess,
  editingFieldId,
  onEditField,
  onCancelEdit,
}) => {
  const methods = useForm({
    defaultValues: {},
    mode: "onChange", // Валидация при изменении
  });

  const onSubmit = <T,>(data: T) => {
    onSuccess(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {fields.map((field) => {
          const isEditing = editingFieldId === field.id;
          const isDisabled = !!editingFieldId; // Все поля заблокированы во время редактирования

          return (
            <div
              key={field.id}
              className={`flex items-start gap-2 transition-all duration-200 ${
                isDisabled && !isEditing ? "opacity-50 pointer-events-none" : ""
              } ${
                isEditing
                  ? "bg-red-50 p-3 rounded-lg border-2 border-red-300 relative"
                  : ""
              }`}
            >
              {isEditing && (
                <div className="absolute -top-3 left-2 bg-white text-red-500 text-xs px-2 py-1 rounded border border-red-300 shadow-sm">
                  Редактируется
                </div>
              )}
              <div className="flex-1">
                <FieldController field={field} disabled={isDisabled} />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-6 h-8 w-8 p-0"
                disabled={isDisabled}
                onClick={() => {
                  onEditField?.(field);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
        <Button type="submit" disabled={!!editingFieldId}>
          Отправить данные формы
        </Button>
      </form>
    </FormProvider>
  );
};
