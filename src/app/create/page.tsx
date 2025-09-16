"use client";

import { PageLayout } from "@/components/layouts/PageLayout";
import { ConstructorWidget } from "@/components/Constructor";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormsStorage } from "@/hooks/use-forms-storage";
import { FormSchema } from "@/components/Constructor/types";
import { PageContainer } from "@/components/layouts/PageContainer";

export default function CreatePage() {
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
