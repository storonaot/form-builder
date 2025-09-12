import { FormProvider, useForm, RegisterOptions } from "react-hook-form";
import { Button } from "../ui/button";
import { FieldSchema } from "../types.ts";
import { FC, useMemo } from "react";
import { FieldController } from "./FieldController";

type Props = {
  fields: FieldSchema[];
  onSuccess: <T>(data: T) => void;
};

export const FormRenderer: FC<Props> = ({ fields, onSuccess }) => {
  // Генерируем правила валидации на основе схемы полей
  const validationRules = useMemo(() => {
    const rules: Record<string, RegisterOptions> = {};
    
    fields.forEach((field) => {
      const fieldRules: RegisterOptions = {};
      
      // Добавляем обязательность
      if (field.required) {
        fieldRules.required = `${field.label} обязательно для заполнения`;
      }
      
      // Добавляем типо-специфичные валидации
      switch (field.type) {
        case "string":
          fieldRules.minLength = {
            value: 1,
            message: `${field.label} не может быть пустым`
          };
          break;
        case "integer":
          fieldRules.pattern = {
            value: /^-?\d+$/,
            message: `${field.label} должно быть целым числом`
          };
          break;
        case "decimal":
          fieldRules.pattern = {
            value: /^-?\d*\.?\d+$/,
            message: `${field.label} должно быть числом`
          };
          break;
        case "datetime":
          fieldRules.validate = (value: string) => {
            if (!value) return field.required ? `${field.label} обязательно` : true;
            const date = new Date(value);
            return !isNaN(date.getTime()) || `${field.label} должно быть корректной датой`;
          };
          break;
      }
      
      rules[field.name] = fieldRules;
    });
    
    return rules;
  }, [fields]);

  const methods = useForm({ 
    defaultValues: {},
    mode: "onChange" // Валидация при изменении
  });

  const onSubmit = <T,>(data: T) => {
    onSuccess(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {fields.map((field) => (
          <FieldController 
            key={field.id} 
            field={field} 
            validationRules={validationRules[field.name]}
          />
        ))}
        <Button type="submit">Отправить данные формы</Button>
      </form>
    </FormProvider>
  );
};
