"use client";

import { useState } from "react";
import { FieldSettings } from "./FieldSettings";
import { FieldVariantSelector, FieldType } from "./FieldVariantSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FieldBuilderWidget = () => {
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(
    null
  );

  const handleFieldTypeChange = (type: FieldType) => {
    setSelectedFieldType(type);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настроить поле</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldVariantSelector
          selectedType={selectedFieldType || undefined}
          onTypeChange={handleFieldTypeChange}
        />
        <FieldSettings />
      </CardContent>
    </Card>
  );
};
