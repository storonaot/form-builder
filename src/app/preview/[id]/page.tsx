"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import { PageContainer } from "@/components/layouts/PageContainer";
import { FormRenderer } from "@/components/shared/features/FormRenderer";
import { useFormsStorage } from "@/components/Constructor/use-forms-storage";
import { useModalState } from "@/components/ui/Modal/useModalState";
import { StructurePreviewModal } from "@/components/shared/features/StructurePreviewModal";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Nullable } from "@/lib/utility-types";
import { FieldSchema, FormDataCustom } from "@/components/Constructor/types";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { getForm } = useFormsStorage();
  const formDataModal = useModalState();
  const formData = useRef<Nullable<FormDataCustom>>(null);
  const [isClient, setIsClient] = useState(false);

  const formId = params.id as string;
  const form = getForm(formId);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <PageContainer title="Загрузка..." subtitle="Загружаем форму...">
        <div>Загрузка...</div>
      </PageContainer>
    );
  }

  if (!form) {
    notFound();
  }

  const handleFormSubmit = (data: FormDataCustom) => {
    formData.current = data;
    formDataModal.open();
  };

  const handleEdit = () => {
    router.push(`/edit/${formId}`);
  };

  const handleBack = () => {
    router.push("/");
  };
  return (
    <PageLayout>
      <PageContainer
        title={`Превью формы: ${form.name}`}
        subtitle={form.description}
        onBack={handleBack}
      >
        <div className="space-y-6">
          {/* Кнопка редактирования */}
          <div className="flex justify-end">
            <Button onClick={handleEdit} className="gap-2">
              <Edit className="h-4 w-4" />
              Редактировать форму
            </Button>
          </div>

          {/* Форма */}
          <div className="max-w-2xl mx-auto">
            <FormRenderer onSubmit={handleFormSubmit}>
              {form.fields.map((field: FieldSchema) => (
                <FormRenderer.Field key={field.id} field={field} />
              ))}
            </FormRenderer>
          </div>

          {/* Модальное окно с данными формы */}
          <StructurePreviewModal
            modal={{
              open: formDataModal.isOpen,
              onToggle: formDataModal.toggle,
              onClose: formDataModal.close,
            }}
            title={`Данные формы "${form.name}"`}
            structure={formData.current}
          />
        </div>
      </PageContainer>
    </PageLayout>
  );
}
