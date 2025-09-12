"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FormPreviewWidget } from "@/components/FormPreviewWidget";
import { FieldBuilderWidget } from "@/components/FieldBuilderWidget";
import { useState } from "react";
import { FieldSettingsData, FormSettings } from "@/components/types.ts";
import { nanoid } from "nanoid";
import { useFormsStorage } from "@/lib/hooks/use-forms-storage";

export default function CreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { addNewForm, getForm, removeForm } = useFormsStorage();

  const formName = searchParams.get("name") || "Новая форма";
  const formDescription = searchParams.get("description") || "Описание формы";

  const [fields, setFields] = useState<FieldSettingsData[]>([]);

  const onCreateField = (field: FieldSettingsData) => {
    setFields([...fields, field]);
  };

  const onSubmitData = (data: any) => {
    console.log(data);
  };

  const handleSaveForm = () => {
    const data: FormSettings = {
      id: nanoid(),
      name: formName,
      description: formDescription,
      fields: fields,
      createdAt: new Date().toISOString(),
    };

    addNewForm(data);

    // Показываем уведомление об успешном сохранении
    alert(`Форма "${formName}" успешно сохранена!`);

    // TODO: раскомментировать позже
    // Перенаправляем на главную страницу
    // router.push("/");
  };

  return (
    <PageLayout>
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-3 w-3" />
          Назад
        </Button>

        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-3xl font-bold">Создание формы: {formName}</h1>
            <p className="text-muted-foreground mt-2">{formDescription}</p>
          </div>
          <Button variant="outline" onClick={handleSaveForm}>
            Сохранить настройки формы
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <FormPreviewWidget fields={fields} onSuccess={onSubmitData} />
          </div>
          <div className="col-span-4">
            <FieldBuilderWidget onCreate={onCreateField} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
