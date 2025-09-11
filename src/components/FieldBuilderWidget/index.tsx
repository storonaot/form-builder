"use client";

import { useState } from "react";
import { FieldSettings } from "./FieldSettings";
import { FieldVariantSelector } from "./FieldVariantSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldSettingsData, FieldType } from "./types";
import { Nullable } from "@/lib/utility-types";

export const FieldBuilderWidget = () => {
  const [selectedFieldType, setSelectedFieldType] =
    useState<Nullable<FieldType>>(null);

  const handleFieldTypeChange = (type: FieldType) => {
    setSelectedFieldType(type);
  };

  const handleFieldSettingsSubmit = (data: FieldSettingsData) => {
    if (!selectedFieldType) return;

    const fieldData = {
      type: selectedFieldType,
      ...data,
    };

    console.log("Field data:", fieldData);
    setSelectedFieldType(null); // Сброс после добавления
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
