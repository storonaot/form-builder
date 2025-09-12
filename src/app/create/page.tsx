"use client";

import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { useFormContext } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FormPreviewWidget } from "@/components/FormPreviewWidget";
import { FieldBuilderWidget } from "@/components/FieldBuilderWidget";
import { useState } from "react";
import { FieldSettingsData } from "@/components/types.ts";

export default function CreatePage() {
  const router = useRouter();
  const { currentForm } = useFormContext();

  const [fields, setFields] = useState<FieldSettingsData[]>([]);

  // Дефолтные значения при потере контекста
  const defaultForm = {
    name: "Новая форма",
    description: "Описание формы недоступно - контекст потерян",
  };

  const formData = currentForm || defaultForm;
  const isContextLost = !currentForm;

  const onCreateField = (field: FieldSettingsData) => {
    setFields([...fields, field]);
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

        {isContextLost && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ Контекст формы потерян. Используются дефолтные значения.
            </p>
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold">
            Создание формы: {formData.name}
          </h1>
          {formData.description && (
            <p className="text-muted-foreground mt-2">{formData.description}</p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <FormPreviewWidget fields={fields} />
          </div>
          <div className="col-span-4">
            <FieldBuilderWidget onCreate={onCreateField} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
