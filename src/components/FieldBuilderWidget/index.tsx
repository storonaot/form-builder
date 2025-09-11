"use client";

import { useState } from "react";
import { FieldSettings } from "./FieldSettings";
import { FieldVariantSelector, FieldType } from "./FieldVariantSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldSettingsData } from "./types";

export const FieldBuilderWidget = () => {
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(
    null
  );

  const handleFieldTypeChange = (type: FieldType) => {
    setSelectedFieldType(type);
  };

  const handleFieldSettingsSubmit = (data: FieldSettingsData) => {
    console.log("Field created:", { type: selectedFieldType, ...data });
    // TODO: Добавить поле в форму
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настроить новое поле</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldVariantSelector
          selectedType={selectedFieldType || undefined}
          onTypeChange={handleFieldTypeChange}
        />
        <FieldSettings
          selectedFieldType={selectedFieldType || undefined}
          onSubmit={handleFieldSettingsSubmit}
        />
      </CardContent>
    </Card>
  );
};
