"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Nullable } from "@/lib/utility-types";

export interface Form {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

interface FormContextType {
  currentForm: Nullable<Form>;
  setCurrentForm: (form: Nullable<Form>) => void;
  clearCurrentForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentForm, setCurrentForm] = useState<Nullable<Form>>(null);

  const clearCurrentForm = () => {
    setCurrentForm(null);
  };

  return (
    <FormContext.Provider
      value={{ currentForm, setCurrentForm, clearCurrentForm }}
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
