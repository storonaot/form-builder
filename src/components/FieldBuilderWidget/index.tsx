"use client";

import { useState, useRef } from "react";
import { FieldSettings } from "./FieldSettings";
import { FieldVariantSelector, FieldType } from "./FieldVariantSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldSettingsData } from "./types";
import { Nullable } from "@/lib/utility-types";

export const FieldBuilderWidget = () => {
  const [selectedFieldType, setSelectedFieldType] =
    useState<Nullable<FieldType>>(null);
  const [hasUnsavedData, setHasUnsavedData] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFieldTypeChange = (type: FieldType) => {
    setSelectedFieldType(type);
    setHasUnsavedData(false); // Сброс при смене типа
  };

  const handleFieldSettingsSubmit = (data: FieldSettingsData) => {
    if (!selectedFieldType) return;

    const fieldData = {
      type: selectedFieldType,
      ...data,
    };

    setSelectedFieldType(null); // Сброс после добавления
    setHasUnsavedData(false); // Сброс после сохранения
  };

  const handleFormChange = () => {
    setHasUnsavedData(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настроить новое поле</CardTitle>
        <div>
          {hasUnsavedData
            ? "Есть несохраненные данные"
            : "Нет несохраненных данных"}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldVariantSelector
          selectedType={selectedFieldType || undefined}
          onTypeChange={handleFieldTypeChange}
          hasUnsavedData={hasUnsavedData}
        />
        <FieldSettings
          selectedFieldType={selectedFieldType || undefined}
          onSubmit={handleFieldSettingsSubmit}
          onFormChange={handleFormChange}
        />
      </CardContent>
    </Card>
  );
};
