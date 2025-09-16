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
    if (!id) throw new Error("Form ID is required");

    return forms.find((form) => form.id === id);
  };

  const updateFormById = (id: string, updatedData: Partial<FormSchema>) => {
    const updatedForms = forms.map((form) => {
      if (form.id === id) {
        return { ...form, ...updatedData };
      }
      return form;
    });
    setForms(updatedForms);

    // Сохраняем в localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    }
  };

  const removeFormById = (id: string) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);

    // Сохраняем в localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    }
  };

  const clearAllForms = () => {
    setForms([]);

    // Очищаем localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    addNewForm,
    getForm: getFormById,
    removeForm: removeFormById,
    clearAllForms,
    updateForm: updateFormById,
    forms, // Добавляем forms для доступа к списку
  };
};
