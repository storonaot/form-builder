"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";
import { FormRenderer } from "./FormRenderer";
import { FieldSettingsData } from "../types.ts";

type Props = {
  fields: FieldSettingsData[];
};

export const FormPreviewWidget: FC<Props> = ({ fields }) => {
  const hasFields = fields.length > 0;

  const onSuccess = (data: any) => {
    console.log("FormPreviewWidget", data);
  };

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
            <FormRenderer fields={fields} onSuccess={onSuccess} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
