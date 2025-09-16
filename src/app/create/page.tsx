"use client";

import { Suspense } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { ConstructorWidget } from "@/components/Constructor";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormsStorage } from "@/components/Constructor/use-forms-storage";
import { FormSchema } from "@/components/Constructor/types";
import { PageContainer } from "@/components/layouts/PageContainer";

function CreatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formName = searchParams.get("name") || "Новая форма";
  const formDescription = searchParams.get("description") || "Описание формы";

  const { addNewForm } = useFormsStorage();

  const handleSaveSchema = (data: FormSchema) => {
    addNewForm(data);
    // Показываем уведомление об успешном сохранении
    alert(`Форма "${formName}" успешно сохранена!`);

    // Перенаправляем на главную страницу
    router.push("/");
  };

  return (
    <PageLayout>
      <PageContainer
        title={`Создание формы: ${formName}`}
        subtitle={formDescription}
        onBack={() => router.push("/")}
      >
        <ConstructorWidget
          formSchema={{
            name: formName,
            description: formDescription,
            fields: [],
          }}
          onFormSchemaSubmit={handleSaveSchema}
        />
      </PageContainer>
    </PageLayout>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CreatePageContent />
    </Suspense>
  );
}
