"use client";

import { StructurePreviewModal } from "@/components/features/StructurePreviewModal";
import { FormRenderer } from "@/components/FormRenderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModalState } from "@/components/ui/Modal/useModalState";
import { useFormsStorage } from "@/lib/hooks/use-forms-storage";
import { Nullable } from "@/lib/utility-types";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useRef } from "react";

const isString = (id: unknown): id is string => {
  return typeof id === "string";
};

export default function PreviewPage() {
  const { id } = useParams();
  const { getForm } = useFormsStorage();

  const formData = useRef<Nullable<FormData>>(null);

  // Получаем форму по ID
  const formSchema = getForm(isString(id) ? id : "");

  const formDataModal = useModalState();

  const onSubmit = (data: any) => {
    formData.current = data;
    formDataModal.open();
  };

  // Если форма не найдена, показываем 404
  if (!formSchema) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            Предварительный просмотр формы: {formSchema.name}
          </CardTitle>
          {formSchema.description && (
            <p className="text-sm text-muted-foreground">
              {formSchema.description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <FormRenderer onSubmit={onSubmit} submitText="Отправить данные формы">
            {formSchema.fields.map((field) => (
              <FormRenderer.Field key={field.id} field={field} />
            ))}
          </FormRenderer>
        </CardContent>
      </Card>

      <StructurePreviewModal
        modal={{
          open: formDataModal.isOpen,
          onToggle: formDataModal.toggle,
          onClose: formDataModal.close,
        }}
        title="Данные формы"
        structure={formData.current}
      />
    </div>
  );
}
