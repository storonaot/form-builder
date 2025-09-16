"use client";
import { useRouter } from "next/navigation";
import { EmptyList } from "./EmptyList";
import { ListItem } from "./ListItem";
import { useFormsStorage } from "@/hooks/use-forms-storage";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { InitConstructorFeature } from "../shared/features/InitConstructorFeature";

export const FormListWidget = () => {
  const { forms, removeForm, clearAllForms } = useFormsStorage();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goToEditPage = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const goToPreviewPage = (id: string) => {
    router.push(`/preview/${id}`);
  };

  const handleDelete = (id: string) => {
    removeForm(id);
  };

  const handleClearAll = () => {
    const confirmMsg =
      "Вы уверены, что хотите удалить все формы? Это действие нельзя отменить.";

    if (confirm(confirmMsg)) clearAllForms();
  };

  if (!isClient) {
    return <div>Загрузка...</div>;
  }

  if (forms.length === 0) return <EmptyList />;

  return (
    <div className="space-y-6">
      {/* Кнопка создания формы - справа с отступом снизу */}
      <div className="flex justify-end">
        <InitConstructorFeature />
      </div>
      <div className="space-y-4">
        {forms.map((form) => (
          <ListItem
            key={form.id}
            id={form.id}
            name={form.name}
            description={form.description}
            handleEdit={goToEditPage}
            showPreview={goToPreviewPage}
            handleDelete={handleDelete}
            fieldsCount={form.fields.length}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button variant="destructive" onClick={handleClearAll}>
          Удалить все формы
        </Button>
      </div>
    </div>
  );
};
