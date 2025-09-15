import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ConstructorFormPreview } from "@/components/ConstructorWidget/ConstructorFormPreview";
import { FieldBuilderWidget } from "@/components/FieldBuilderWidget";
import { FC, useRef, useState } from "react";
import { FieldSchema, FormSchema } from "@/components/types.ts";
import { nanoid } from "nanoid";
import { Nullable } from "@/lib/utility-types";
import { useModalState } from "../ui/Modal/useModalState";
import { StructurePreviewModal } from "../features/StructurePreviewModal";

type Props = {
  formName: string;
  onFormSchemaSubmit: (formSchema: FormSchema) => void;
  formDescription?: string;
};

type FormData = Record<string, any>;

export const ConstructorWidget: FC<Props> = ({
  formName,
  onFormSchemaSubmit,
  formDescription,
}) => {
  const router = useRouter();
  const formData = useRef<Nullable<FormData>>(null);

  // модалки
  const formDataModal = useModalState();
  const formSchemaModal = useModalState();

  const [fields, setFields] = useState<FieldSchema[]>([]);

  const [editingFieldId, setEditingFieldId] = useState<string | undefined>(
    undefined
  );

  const onSubmitFieldSchema = (field: FieldSchema) => {
    if (editingFieldId) {
      // Редактирование существующего поля
      setFields(fields.map((f) => (f.id === editingFieldId ? field : f)));
      setEditingFieldId(undefined);
    } else {
      // Добавление нового поля
      setFields([...fields, field]);
    }
  };

  const showFormData = <T,>(data: T) => {
    formData.current = data;
    formDataModal.open();
    console.log("Данные формы:", data);
  };

  const handleShowFormSchema = () => {
    formSchemaModal.open();
  };

  const handleEditField = (field: FieldSchema) => {
    setEditingFieldId(field.id);
  };

  const handleCancelEdit = () => {
    setEditingFieldId(undefined);
  };

  const goBack = () => {
    router.back();
  };

  const generateFormSchema = (id: string): FormSchema => {
    return {
      id,
      name: formName,
      description: formDescription || "",
      fields: fields,
    };
  };

  const handleSubmitFormSchema = () => {
    const formSchema = generateFormSchema(nanoid());

    onFormSchemaSubmit(formSchema);
  };

  return (
    <>
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
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
            <Button variant="outline" onClick={handleSubmitFormSchema}>
              Сохранить схему формы
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <ConstructorFormPreview
              fields={fields}
              onSubmitForm={showFormData}
              onEditField={handleEditField}
              editingFieldId={editingFieldId}
            />
          </div>
          <div className="col-span-4">
            <FieldBuilderWidget
              onCreate={onSubmitFieldSchema}
              onReset={handleCancelEdit}
              editingField={fields.find((f) => f.id === editingFieldId)}
            />
          </div>
        </div>
      </div>

      {/* Модальное окно с данными формы */}
      <StructurePreviewModal
        modal={{
          open: formDataModal.isOpen,
          onToggle: formDataModal.toggle,
          onClose: formDataModal.close,
        }}
        title={`Данные формы "${formName}"`}
        structure={formData.current}
      />

      {/* Модальное окно со схемой формы */}
      <StructurePreviewModal
        modal={{
          open: formSchemaModal.isOpen,
          onToggle: formSchemaModal.toggle,
          onClose: formSchemaModal.close,
        }}
        title={`Схема формы "${formName}"`}
        structure={generateFormSchema("generated-on-save")}
      />
    </>
  );
};
