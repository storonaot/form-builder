"use client";

import { useFormContext } from "@/contexts/FormContext";
import { Card, CardContent } from "@/components/ui/card";

export const FormPreviewWidget = () => {
  const { currentForm } = useFormContext();

  const hasFields = currentForm?.fields && currentForm.fields.length > 0;

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
            <p>
              Здесь будет отображаться предварительный просмотр формы с
              добавленными полями.
            </p>
            <p className="mt-2">
              Добавлено полей: {currentForm?.fields?.length || 0}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
