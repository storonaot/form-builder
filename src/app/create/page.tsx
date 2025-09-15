"use client";

import { PageLayout } from "@/components/PageLayout";
import { ConstructorWidget } from "@/components/ConstructorWidget";
import { useRouter, useSearchParams } from "next/navigation";
import { FormSchema } from "@/components/types.ts";
import { useFormsStorage } from "@/lib/hooks/use-forms-storage";

export default function CreatePage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const formName = searchParams.get("name") || "Новая форма";
  const formDescription = searchParams.get("description") || "Описание формы";

  const { addNewForm } = useFormsStorage();

  const handleSaveForm = (data: FormSchema) => {
    addNewForm(data);
    // Показываем уведомление об успешном сохранении
    alert(`Форма "${formName}" успешно сохранена!`);

    // Перенаправляем на главную страницу
    router.push("/");
  };

  return (
    <PageLayout>
      <ConstructorWidget
        formName={formName}
        formDescription={formDescription}
        onFormSchemaSubmit={handleSaveForm}
      />
    </PageLayout>
  );
}
