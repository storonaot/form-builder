"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { FieldWrapper } from "../ui/FieldWrapper";
import { SelectField } from "../ui/SelectField";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { FieldSchema, FieldType } from "../types.ts";
import { FC, useRef } from "react";
import { getErrorMessage } from "@/lib/form-utils";
import { nanoid } from "nanoid";

const fieldTypes = [
  { value: "string", label: "Текст" },
  { value: "integer", label: "Целое число" },
  { value: "decimal", label: "Десятичное число" },
  { value: "datetime", label: "Дата и время" },
];

type Props = {
  onCreate: (data: FieldSchema) => void;
};

export const FieldBuilderWidget: FC<Props> = ({ onCreate }) => {
  const methods = useForm<FieldSchema>();
  const { register, watch, reset, setValue, formState } = methods;
  const prevFieldType = useRef<FieldType>(null);

  const onSubmit = (fieldSettings: FieldSchema) => {
    onCreate({ ...fieldSettings, id: nanoid() });
    reset();
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
        <CardTitle>Добавить новое поле</CardTitle>
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

            <FieldWrapper
              htmlFor="name"
              label="Имя поля"
              errorMsg={getErrorMessage(formState.errors, "name")}
            >
              <Input
                id="name"
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
                {...register("label")}
                placeholder="Введите название поля"
              />
            </FieldWrapper>

            <FieldWrapper
              htmlFor="required"
              label="Обязательное поле"
              errorMsg={getErrorMessage(formState.errors, "required")}
            >
              <Controller
                name="required"
                control={methods.control}
                defaultValue={false}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
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
