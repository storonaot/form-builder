"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Nullable } from "@/lib/utility-types";
import { generateFormId, generateFieldId } from "@/lib/id-generator";
import { Field, FieldSettings } from "@/components/FieldBuilderWidget/types";

export interface Form {
  id?: string;
  name: string;
  description: string;
  createdAt: Date;
  fields?: Field[];
}

interface FormContextType {
  currentForm: Nullable<Form>;
  setCurrentForm: (form: Nullable<Form>) => void;
  clearCurrentForm: () => void;
  addFieldToForm: (field: FieldSettings) => void;
  saveForm: () => Form;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentForm, setCurrentForm] = useState<Nullable<Form>>(null);

  const clearCurrentForm = () => {
    setCurrentForm(null);
  };

  const addFieldToForm = (field: FieldSettings) => {
    if (!currentForm) return;

    const newField: Field = {
      ...field,
      id: generateFieldId(),
    } as Field;

    setCurrentForm({
      ...currentForm,
      fields: [...(currentForm.fields || []), newField],
    });
  };

  const saveForm = (): Form => {
    if (!currentForm) {
      throw new Error("No form to save");
    }

    const savedForm: Form = {
      ...currentForm,
      id: generateFormId(),
    };

    return savedForm;
  };

  return (
    <FormContext.Provider
      value={{
        currentForm,
        setCurrentForm,
        clearCurrentForm,
        addFieldToForm,
        saveForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
