"use client";

import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { useFormContext } from "@/contexts/FormContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FormPreviewWidget } from "@/components/FormPreviewWidget";
import { FieldBuilderWidget } from "@/components/FieldBuilderWidget";

export default function CreatePage() {
  const router = useRouter();
  const { currentForm } = useFormContext();

  if (!currentForm) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-muted-foreground">
            Форма не найдена
          </h1>
        </div>
      </PageLayout>
    );
  }

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

        <div>
          <h1 className="text-3xl font-bold">
            Создание формы: {currentForm.name}
          </h1>
          {currentForm.description && (
            <p className="text-muted-foreground mt-2">
              {currentForm.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <FormPreviewWidget />
          </div>
          <div className="col-span-4">
            <FieldBuilderWidget />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
