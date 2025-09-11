"use client";

import { FieldType, FieldSettings as FieldSettingsType } from "../types";
import { FC } from "react";
import { BaseFieldSettings } from "./BaseFieldSettings";

interface FieldSettingsProps {
  selectedFieldType?: FieldType;
  onSubmit?: (data: FieldSettingsType) => void;
}

export const FieldSettings: FC<FieldSettingsProps> = ({
  selectedFieldType,
  onSubmit,
}) => {
  if (!selectedFieldType) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">Выберите тип поля для настройки</p>
      </div>
    );
  }

  return (
    <BaseFieldSettings
      selectedFieldType={selectedFieldType}
      onSubmit={onSubmit}
    />
  );
};
