"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { FieldWrapper } from "../ui/FieldWrapper";
import { SelectField } from "../ui/SelectField";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FieldSchema, FieldType, FieldSettings } from "../types.ts";
import { FC, useRef, useEffect } from "react";
import { getErrorMessage } from "@/lib/form-utils";
import { nanoid } from "nanoid";
import { SpecificSettings } from "./SpecificSettings";

const fieldTypes = [
  { value: "string", label: "Текст" },
  { value: "integer", label: "Целое число" },
  { value: "decimal", label: "Десятичное число" },
  { value: "datetime", label: "Дата и время" },
];

type Props = {
  onCreate: (data: FieldSchema) => void;
  editingField?: FieldSchema;
  onCancelEdit?: () => void;
};

export const FieldBuilderWidget: FC<Props> = ({
  onCreate,
  editingField,
  onCancelEdit,
}) => {
  const methods = useForm<FieldSettings>();
  const { register, watch, reset, setValue, formState } = methods;
  const prevFieldType = useRef<FieldType>(null);

  // Загружаем данные редактируемого поля или очищаем форму
  useEffect(() => {
    if (editingField) {
      const { id, ...fieldData } = editingField;
      reset(fieldData);
    } else {
      // Очищаем форму в пустое состояние
      reset({
        type: undefined,
        name: "",
        label: "",
        required: false,
      } as unknown as FieldSettings);
    }
  }, [editingField, reset]);

  const onSubmit = (fieldSettings: FieldSettings) => {
    // Фильтруем пустые значения перед сохранением
    const cleanFieldSettings = Object.fromEntries(
      Object.entries(fieldSettings).filter(([key, value]) => {
        // Убираем пустые строки, undefined, null и пустые числа
        if (value === "" || value === undefined || value === null) {
          return false;
        }
        // Для числовых полей проверяем, что это не NaN
        if (typeof value === "number" && isNaN(value)) {
          return false;
        }
        return true;
      })
    );

    const fieldWithId: FieldSchema = {
      ...cleanFieldSettings,
      id: editingField?.id || nanoid(),
    } as FieldSchema;

    onCreate(fieldWithId);
    // Сбрасываем форму в пустое состояние
    reset({
      type: undefined,
      name: "",
      label: "",
      required: false,
    } as unknown as FieldSettings);
  };

  const handleTypeChange = (value: string) => {
    if (prevFieldType.current !== value) {
      reset();
    }
    // TODO: fix type
    prevFieldType.current = value as FieldType;
    setValue("type", value as FieldType);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingField
            ? `Редактирование поля: ${editingField.label} (${editingField.name})`
            : "Добавить новое поле"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <FieldWrapper
              label="Тип поля"
              errorMsg={getErrorMessage(formState.errors, "type")}
              htmlFor="type"
            >
              <SelectField
                value={watch("type") || ""}
                onValueChange={handleTypeChange}
                placeholder="Выберите тип поля"
                options={fieldTypes}
              />
            </FieldWrapper>

            {watch("type") && (
              <>
                <FieldWrapper
                  htmlFor="name"
                  label="Имя поля"
                  errorMsg={getErrorMessage(formState.errors, "name")}
                  required={true}
                >
                  <Input
                    id="name"
                    error={Boolean(getErrorMessage(formState.errors, "name"))}
                    {...register("name", { required: "Имя поля обязательно" })}
                    placeholder="Введите имя поля (например: email, phone)"
                  />
                </FieldWrapper>

                <FieldWrapper
                  htmlFor="label"
                  label="Лейбл"
                  errorMsg={getErrorMessage(formState.errors, "label")}
                >
                  <Input
                    id="label"
                    error={Boolean(getErrorMessage(formState.errors, "label"))}
                    {...register("label")}
                    placeholder="Введите название поля"
                  />
                </FieldWrapper>

                <SpecificSettings fieldType={watch("type")} />
              </>
            )}
            {watch("type") && (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white font-medium"
                >
                  {editingField ? "Сохранить изменения" : "Добавить поле"}
                </Button>
                {editingField && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancelEdit}
                  >
                    Отмена
                  </Button>
                )}
              </div>
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
