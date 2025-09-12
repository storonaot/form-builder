import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FieldSchema } from "../types.ts";
import { FC } from "react";
import { FieldController } from "./FieldController";

type Props = {
  fields: FieldSchema[];
  onSuccess: <T>(data: T) => void;
};

export const FormRenderer: FC<Props> = ({ fields, onSuccess }) => {
  const methods = useForm({
    defaultValues: {},
    mode: "onChange", // Валидация при изменении
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
          <FieldController key={field.id} field={field} />
        ))}
        <Button type="submit">Отправить данные формы</Button>
      </form>
    </FormProvider>
  );
};
