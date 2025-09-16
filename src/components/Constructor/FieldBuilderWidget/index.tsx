"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { FieldWrapper } from "../../ui/FieldWrapper";
import { SelectField } from "../../ui/SelectField";
import { Button } from "../../ui/button";
import { FieldSchema, FieldSettings } from "../types";
import { FC, useRef, useEffect } from "react";
import { getErrorMessage } from "@/lib/form-utils";
import { nanoid } from "nanoid";
import { cleanFieldSettings } from "./clean-field-settings";
import { BaseFields } from "./BaseFields";
import { ValidationFields } from "./ValidationFields";
import { FieldType } from "../types";

type FieldTypeOption = {
  value: FieldType;
  label: string;
};

const fieldTypes: FieldTypeOption[] = [
  { value: "string", label: "Текст" },
  { value: "integer", label: "Целое число" },
  { value: "decimal", label: "Десятичное число" },
  { value: "datetime", label: "Дата и время" },
] as const;

type Props = {
  onCreate: (data: FieldSchema) => void;
  editingField?: FieldSchema;
  onReset?: () => void;
};

const DEFAULT_INITIAL_DATA = {
  type: undefined,
  name: "",
  label: "",
  required: false,
};

export const FieldBuilderWidget: FC<Props> = ({
  onCreate,
  editingField,
  onReset,
}) => {
  const methods = useForm<FieldSettings>();
  const { watch, reset, setValue, formState } = methods;
  const prevFieldType = useRef<FieldType>(null);

  // Загружаем данные редактируемого поля или очищаем форму
  useEffect(() => {
    if (editingField) {
      const { ...fieldData } = editingField;
      reset(fieldData);
    } else {
      // Очищаем форму в пустое состояние
      reset(DEFAULT_INITIAL_DATA);
    }
  }, [editingField, reset]);

  const onSubmit = (fieldSettings: FieldSettings) => {
    // Фильтруем пустые значения перед сохранением
    const cleanedSettings = cleanFieldSettings(fieldSettings);

    const fieldWithId = {
      ...cleanedSettings,
      id: editingField?.id || nanoid(),
    } as FieldSchema;

    onCreate(fieldWithId);
    // Сбрасываем форму в пустое состояние
    reset(DEFAULT_INITIAL_DATA);
  };

  const handleTypeChange = (value: FieldType) => {
    if (prevFieldType.current !== value) {
      reset();
    }
    prevFieldType.current = value;
    setValue("type", value);
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
              <SelectField<FieldType>
                value={watch("type") || ""}
                onValueChange={handleTypeChange}
                placeholder="Выберите тип поля"
                options={fieldTypes}
              />
            </FieldWrapper>

            {watch("type") && (
              <>
                <BaseFields />
                <ValidationFields fieldType={watch("type")} />
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
                  <Button type="button" variant="outline" onClick={onReset}>
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
