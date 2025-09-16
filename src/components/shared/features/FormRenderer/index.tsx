import { FormProvider, useForm } from "react-hook-form";
import { FC, ReactNode } from "react";
import { FieldController } from "./FieldController";
import { FieldSchema } from "@/components/Constructor/types";
import { Button } from "@/components/ui/button";

type FormRendererProps = {
  children: ReactNode;
  onSubmit: <T>(data: T) => void;
  submitText?: string;
  disabled?: boolean;
};

type FieldProps = {
  field: FieldSchema;
  disabled?: boolean;
};

const FormRendererComponent: FC<FormRendererProps> = ({
  children,
  onSubmit,
  submitText = "Отправить данные формы",
  disabled = false,
}) => {
  const methods = useForm({
    disabled,
    defaultValues: {},
    mode: "onChange",
  });

  const handleSubmit = <T,>(data: T) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        {children}
        <Button type="submit" disabled={disabled}>
          {submitText}
        </Button>
      </form>
    </FormProvider>
  );
};

const Field: FC<FieldProps> = ({ field }) => {
  return <FieldController field={field} />;
};

export const FormRenderer = Object.assign(FormRendererComponent, {
  Field,
});
