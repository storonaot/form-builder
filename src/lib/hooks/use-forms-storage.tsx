import { FieldSchema, FormSchema } from "@/components/types.ts";
import { useState } from "react";

const STORAGE_KEY = "form-builder-forms";

export const useFormsStorage = () => {
  const [forms, setForms] = useState<FormSchema[]>(() => {
    // Инициализация из localStorage при первом рендере
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const addNewForm = (data: FormSchema) => {
    const updatedForms = [...forms, data];
    setForms(updatedForms);

    // Сохраняем в localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    }
  };

  const getFormById = (id: string) => {
    return forms.find((form) => form.id === id);
  };

  const removeFormById = (id: string) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);

    // Сохраняем в localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    }
  };

  return {
    addNewForm,
    getForm: getFormById,
    removeForm: removeFormById,
    forms, // Добавляем forms для доступа к списку
  };
};
