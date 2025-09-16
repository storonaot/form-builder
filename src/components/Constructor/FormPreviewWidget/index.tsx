"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";
import { FieldSchema } from "../types.js";
import { FormRenderer } from "@/components/shared/features/FormRenderer";
import { ConstructorFieldWrapper } from "./ConstructorFieldWrapper";

type Props = {
  fields: FieldSchema[];
  onSubmitForm: <T>(data: T) => void;
  editingFieldId?: string;
  onEditField: (field: FieldSchema) => void;
  onDeleteField: (field: FieldSchema) => void;
};

export const ConstructorFormPreview: FC<Props> = ({
  fields,
  onSubmitForm,
  editingFieldId,
  onEditField,
  onDeleteField,
}) => {
  const hasFields = fields.length > 0;

  if (!hasFields) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-muted-foreground">
            <h3 className="text-lg font-medium mb-2">Форма пуста</h3>
            <p className="text-sm">
              Добавьте хотя бы одно поле в форму, чтобы увидеть предварительный
              просмотр
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="py-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Предварительный просмотр формы
          </h3>
          <div className="text-sm text-muted-foreground">
            <FormRenderer onSubmit={onSubmitForm} disabled={!!editingFieldId}>
              {fields.map((field) => (
                <ConstructorFieldWrapper
                  key={field.id}
                  field={field}
                  isEditing={editingFieldId === field.id}
                  isDisabled={!!editingFieldId}
                  onEdit={onEditField}
                  onDelete={onDeleteField}
                >
                  <FormRenderer.Field field={field} />
                </ConstructorFieldWrapper>
              ))}
            </FormRenderer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
