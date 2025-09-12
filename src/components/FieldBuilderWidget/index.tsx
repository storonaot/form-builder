"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FieldWrapper } from "../ui/FieldWrapper";
import { SelectField } from "../ui/SelectField";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FieldSettingsData, FieldType } from "../types.ts";
import { FC, useRef } from "react";

const fieldTypes = [
  { value: "string", label: "Текст" },
  { value: "integer", label: "Целое число" },
  { value: "decimal", label: "Десятичное число" },
  { value: "datetime", label: "Дата и время" },
];

type Props = {
  onCreate: (data: FieldValues) => void;
};

export const FieldBuilderWidget: FC<Props> = ({ onCreate }) => {
  const methods = useForm();
  const { register, watch, reset, setValue, formState } = methods;
  const prevFieldType = useRef<FieldType>(null);

  const onSubmit = (fieldSettings: FieldValues) => {
    // TODO: fix type
    onCreate(fieldSettings as FieldSettingsData);
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
        <CardTitle>Настроить поле</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <FieldWrapper
              label="Тип поля"
              errors={formState.errors.type}
              htmlFor="type"
            >
              <SelectField
                value={watch("type") || ""}
                onValueChange={handleTypeChange}
                placeholder="Выберите тип поля"
                options={fieldTypes}
              />
            </FieldWrapper>
            <FieldWrapper
              htmlFor="label"
              label="Лейбл"
              errors={formState.errors.label}
            >
              <Input
                id="label"
                {...register("label", { required: "Лейбл обязателен" })}
                placeholder="Введите название поля"
              />
            </FieldWrapper>
            {/* <SpecificSettings fieldType={watch("type")} /> */}
            <Button
              type="submit"
              className="bg-slate-800 hover:bg-slate-900 text-white font-medium"
            >
              Добавить поле
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
