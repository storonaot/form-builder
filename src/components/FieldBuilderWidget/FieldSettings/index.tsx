"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FieldType } from "../FieldVariantSelector";
import { FieldSettingsData } from "../types";
import { FC } from "react";

interface FieldSettingsProps {
  selectedFieldType?: FieldType;
  onSubmit?: (data: FieldSettingsData) => void;
}

const DEFAULT_ERROR_MESSAGE = "Это поле обязательно для заполнения";

export const FieldSettings: FC<FieldSettingsProps> = ({
  selectedFieldType,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldSettingsData>({
    defaultValues: {
      label: "",
      hint: "",
      required: false,
      errorMessage: "",
      defaultValue: "",
      placeholder: "",
    },
  });

  const isRequired = watch("required");
  const fieldType = selectedFieldType;

  const handleFormSubmit = (data: FieldSettingsData) => {
    if (onSubmit) {
      onSubmit(data);
    }
    console.log("Field settings:", data);
  };

  const handleReset = () => {
    reset();
  };

  if (!selectedFieldType) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">Выберите тип поля для настройки</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="required" className="text-sm font-medium">
            Обязательное поле
          </Label>
          <Switch
            id="required"
            checked={watch("required")}
            onCheckedChange={(checked) => {
              setValue("required", !!checked);
            }}
          />
        </div>

        <Label htmlFor="label" className="text-sm font-medium">
          Лейбл поля <span className="text-red-500">*</span>
        </Label>
        <Input
          id="label"
          {...register("label", { required: "Лейбл обязателен" })}
          placeholder="Введите название поля"
        />
        {errors.label && (
          <p className="text-xs text-red-500">{errors.label.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hint" className="text-sm font-medium">
          Подсказка
        </Label>
        <Textarea
          id="hint"
          {...register("hint")}
          placeholder="Введите подсказку для пользователя"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="placeholder" className="text-sm font-medium">
          Плейсхолдер
        </Label>
        <Input
          id="placeholder"
          {...register("placeholder")}
          placeholder="Введите текст-подсказку для поля"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="defaultValue" className="text-sm font-medium">
          Значение по умолчанию
        </Label>
        <Input
          id="defaultValue"
          {...register("defaultValue")}
          placeholder="Введите значение по умолчанию"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          className="flex-1"
          type="button"
          size="sm"
          onClick={handleReset}
          variant="outline"
        >
          Сбросить
        </Button>
        <Button
          type="submit"
          size="sm"
          className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-medium"
        >
          Добавить поле
        </Button>
      </div>
    </form>
  );
};
