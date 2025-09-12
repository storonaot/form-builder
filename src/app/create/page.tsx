"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FormPreviewWidget } from "@/components/FormPreviewWidget";
import { FieldBuilderWidget } from "@/components/FieldBuilderWidget";
import { useState } from "react";
import { FieldSchema, FormSettings } from "@/components/types.ts";
import { nanoid } from "nanoid";
import { useFormsStorage } from "@/lib/hooks/use-forms-storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { addNewForm, getForm, removeForm } = useFormsStorage();

  const formName = searchParams.get("name") || "Новая форма";
  const formDescription = searchParams.get("description") || "Описание формы";

  const [fields, setFields] = useState<FieldSchema[]>([]);
  const [isFormDataModalOpen, setIsFormDataModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [isFormSchemaModalOpen, setIsFormSchemaModalOpen] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | undefined>(
    undefined
  );

  const onCreateField = (field: FieldSchema) => {
    if (editingFieldId) {
      // Редактирование существующего поля
      setFields(fields.map((f) => (f.id === editingFieldId ? field : f)));
      setEditingFieldId(undefined);
    } else {
      // Добавление нового поля
      setFields([...fields, field]);
    }
  };

  const onSubmitData = (data: any) => {
    setFormData(data);
    setIsFormDataModalOpen(true);
    console.log("Данные формы:", data);
  };

  const handleSaveForm = () => {
    const data: FormSettings = {
      id: nanoid(),
      name: formName,
      description: formDescription,
      fields: fields,
      createdAt: new Date().toISOString(),
    };

    addNewForm(data);

    // Показываем уведомление об успешном сохранении
    alert(`Форма "${formName}" успешно сохранена!`);

    // TODO: раскомментировать позже
    // Перенаправляем на главную страницу
    // router.push("/");
  };

  const handleShowFormSchema = () => {
    setIsFormSchemaModalOpen(true);
  };

  const handleEditField = (field: FieldSchema) => {
    setEditingFieldId(field.id);
  };

  const handleCancelEdit = () => {
    setEditingFieldId(undefined);
  };

  return (
    <PageLayout>
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-3 w-3" />
          Назад
        </Button>

        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">Создание формы: {formName}</h1>
            <p className="text-muted-foreground mt-2">{formDescription}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShowFormSchema}>
              Показать схему формы
            </Button>
            <Button variant="outline" onClick={handleSaveForm}>
              Сохранить настройки формы
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <FormPreviewWidget
              fields={fields}
              onSuccess={onSubmitData}
              editingFieldId={editingFieldId}
              onEditField={handleEditField}
              onCancelEdit={handleCancelEdit}
            />
          </div>
          <div className="col-span-4">
            <FieldBuilderWidget
              onCreate={onCreateField}
              editingField={fields.find((f) => f.id === editingFieldId)}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        </div>
      </div>

      {/* Модальное окно с данными формы */}
      <Dialog open={isFormDataModalOpen} onOpenChange={setIsFormDataModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Данные формы "{formName}"</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">JSON структура:</h3>
              {formData ? (
                <pre className="bg-white p-3 rounded border text-sm overflow-auto max-h-60">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              ) : (
                <p className="text-gray-500">Нет данных</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsFormDataModalOpen(false)}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно со схемой формы */}
      <Dialog
        open={isFormSchemaModalOpen}
        onOpenChange={setIsFormSchemaModalOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Схема формы "{formName}"</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Схема формы:</h3>
              <pre className="bg-white p-3 rounded border text-sm overflow-auto max-h-80">
                {JSON.stringify(
                  {
                    id: "generated-on-save",
                    name: formName,
                    description: formDescription,
                    fields: fields,
                    createdAt: new Date().toISOString(),
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsFormSchemaModalOpen(false)}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
