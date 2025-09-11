"use client";

import { PageLayout } from "@/components/PageLayout";
import { useFormContext } from "@/contexts/FormContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatePage() {
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Создание формы</h1>
          <p className="text-muted-foreground">
            Настройте параметры вашей формы
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentForm.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{currentForm.description}</p>
            <div className="mt-4 text-sm text-muted-foreground">
              Создано: {currentForm.createdAt.toLocaleDateString("ru-RU")}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
