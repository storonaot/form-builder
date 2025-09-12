import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FieldSettingsData } from "../types.ts";
import { FC } from "react";
import { FieldController } from "./FieldController";

type Props = {
  fields: FieldSettingsData[];
  onSuccess: <T>(data: T) => void;
};

export const FormRenderer: FC<Props> = ({ fields, onSuccess }) => {
  const methods = useForm({ defaultValues: {} });

  const onSubmit = <T,>(data: T) => {
    onSuccess(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.id}>
            <FieldController field={field} />
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};
