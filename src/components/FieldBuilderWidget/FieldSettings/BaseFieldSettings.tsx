"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FieldType, FieldSettings as FieldSettingsType } from "../types";
import { FC, useEffect, useRef } from "react";

interface BaseFieldSettingsProps {
  selectedFieldType: FieldType;
  onSubmit?: (data: FieldSettingsType) => void;
}

const DEFAULT_FIELD_VALUES: FieldSettingsType = {
  type: "string",
  name: "",
  label: "",
  hint: "",
  required: false,
  defaultValue: "",
  placeholder: "",
};

export const BaseFieldSettings: FC<BaseFieldSettingsProps> = ({
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
  } = useForm<FieldSettingsType>({
    defaultValues: DEFAULT_FIELD_VALUES,
  });

  const prevFieldTypeRef = useRef<FieldType | undefined>(undefined);
  const isRequired = watch("required");

  // Отслеживаем изменения формы
  const watchedValues = watch();

  // Сброс формы при изменении типа поля
  useEffect(() => {
    if (selectedFieldType && selectedFieldType !== prevFieldTypeRef.current) {
      reset({
        ...DEFAULT_FIELD_VALUES,
        type: selectedFieldType,
      });
      prevFieldTypeRef.current = selectedFieldType;
    }
  }, [selectedFieldType, reset]);

  const handleFormSubmit = (data: FieldSettingsType) => {
    if (onSubmit) {
      onSubmit(data);
    }
    console.log("Field settings:", data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Общие поля для всех типов */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="required"
            checked={watch("required")}
            onCheckedChange={(checked) => {
              setValue("required", !!checked);
            }}
          />
          <Label htmlFor="required" className="text-sm font-medium">
            Обязательное поле
          </Label>
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

      {/* Специфичные поля для каждого типа будут добавлены в дочерних компонентах */}
      {renderSpecificFields(selectedFieldType, register, errors)}

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          size="sm"
          className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-medium"
        >
          Добавить поле
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={handleReset}>
          Сбросить
        </Button>
      </div>
    </form>
  );
};

// Функция для рендера специфичных полей
function renderSpecificFields(
  fieldType: FieldType,
  register: any,
  errors: any
) {
  switch (fieldType) {
    case "string":
      return <StringFieldSpecificFields register={register} errors={errors} />;
    case "integer":
      return <IntegerFieldSpecificFields register={register} errors={errors} />;
    case "decimal":
      return <DecimalFieldSpecificFields register={register} errors={errors} />;
    case "datetime":
      return (
        <DateTimeFieldSpecificFields register={register} errors={errors} />
      );
    default:
      return null;
  }
}

// Компоненты для специфичных полей каждого типа
function StringFieldSpecificFields({ register, errors }: any) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-2">
        <Label htmlFor="minLength" className="text-sm font-medium">
          Мин. длина
        </Label>
        <Input
          id="minLength"
          type="number"
          {...register("minLength", {
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Минимальная длина не может быть отрицательной",
            },
          })}
          placeholder="0"
        />
        {errors.minLength && (
          <p className="text-xs text-red-500">{errors.minLength.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxLength" className="text-sm font-medium">
          Макс. длина
        </Label>
        <Input
          id="maxLength"
          type="number"
          {...register("maxLength", {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Максимальная длина должна быть больше 0",
            },
          })}
          placeholder="100"
        />
        {errors.maxLength && (
          <p className="text-xs text-red-500">{errors.maxLength.message}</p>
        )}
      </div>
    </div>
  );
}

function IntegerFieldSpecificFields({ register, errors }: any) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-2">
        <Label htmlFor="min" className="text-sm font-medium">
          Мин. значение
        </Label>
        <Input
          id="min"
          type="number"
          {...register("min", {
            valueAsNumber: true,
            validate: (value: number) =>
              !isNaN(value) || "Введите корректное число",
          })}
          placeholder="0"
        />
        {errors.min && (
          <p className="text-xs text-red-500">{errors.min.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="max" className="text-sm font-medium">
          Макс. значение
        </Label>
        <Input
          id="max"
          type="number"
          {...register("max", {
            valueAsNumber: true,
            validate: (value: number) =>
              !isNaN(value) || "Введите корректное число",
          })}
          placeholder="100"
        />
        {errors.max && (
          <p className="text-xs text-red-500">{errors.max.message}</p>
        )}
      </div>
    </div>
  );
}

function DecimalFieldSpecificFields({ register, errors }: any) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="min" className="text-sm font-medium">
            Мин. значение
          </Label>
          <Input
            id="min"
            type="number"
            step="0.01"
            {...register("min", {
              valueAsNumber: true,
              validate: (value: number) =>
                !isNaN(value) || "Введите корректное число",
            })}
            placeholder="0.00"
          />
          {errors.min && (
            <p className="text-xs text-red-500">{errors.min.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="max" className="text-sm font-medium">
            Макс. значение
          </Label>
          <Input
            id="max"
            type="number"
            step="0.01"
            {...register("max", {
              valueAsNumber: true,
              validate: (value: number) =>
                !isNaN(value) || "Введите корректное число",
            })}
            placeholder="100.00"
          />
          {errors.max && (
            <p className="text-xs text-red-500">{errors.max.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="step" className="text-sm font-medium">
          Шаг (step)
        </Label>
        <Input
          id="step"
          type="number"
          step="0.01"
          {...register("step", {
            valueAsNumber: true,
            min: { value: 0.01, message: "Шаг должен быть больше 0" },
          })}
          placeholder="0.01"
        />
        {errors.step && (
          <p className="text-xs text-red-500">{errors.step.message}</p>
        )}
      </div>
    </div>
  );
}

function DateTimeFieldSpecificFields({ register, errors }: any) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-2">
        <Label htmlFor="min" className="text-sm font-medium">
          Мин. дата
        </Label>
        <Input
          id="min"
          type="datetime-local"
          {...register("min", {
            validate: (value: string) => {
              if (!value) return true; // Поле необязательное
              const date = new Date(value);
              return !isNaN(date.getTime()) || "Введите корректную дату";
            },
          })}
        />
        {errors.min && (
          <p className="text-xs text-red-500">{errors.min.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="max" className="text-sm font-medium">
          Макс. дата
        </Label>
        <Input
          id="max"
          type="datetime-local"
          {...register("max", {
            validate: (value: string) => {
              if (!value) return true; // Поле необязательное
              const date = new Date(value);
              return !isNaN(date.getTime()) || "Введите корректную дату";
            },
          })}
        />
        {errors.max && (
          <p className="text-xs text-red-500">{errors.max.message}</p>
        )}
      </div>
    </div>
  );
}
