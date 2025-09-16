import { Button } from "@/components/ui/button";
import { FieldBuilderWidget } from "@/components/Constructor/FieldBuilderWidget";
import { FC, useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { Nullable } from "@/lib/utility-types";
import { useModalState } from "../ui/Modal/useModalState";
import { Eye, Save } from "lucide-react";
import { FieldSchema, FormSchema } from "./types";
import { ConstructorFormPreview } from "./FormPreviewWidget";
import { StructurePreviewModal } from "../shared/features/StructurePreviewModal";

type Props = {
  onFormSchemaSubmit: (formSchema: FormSchema) => void;
  formSchema: Omit<FormSchema, "id"> & { id?: string };
};

type FormData = Record<string, any>;

export const ConstructorWidget: FC<Props> = ({
  onFormSchemaSubmit,
  formSchema,
}) => {
  const formData = useRef<Nullable<FormData>>(null);

  // модалки
  const formDataModal = useModalState();
  const formSchemaModal = useModalState();

  const [fields, setFields] = useState<FieldSchema[]>(formSchema.fields || []);

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

  const showFormData = (data: FormData) => {
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

  const generateFormSchema = (id: string): FormSchema => {
    return {
      id,
      name: formSchema.name,
      description: formSchema.description || "",
      fields: fields,
    };
  };

  const handleSubmitFormSchema = () => {
    const schema = generateFormSchema(formSchema.id || nanoid());

    onFormSchemaSubmit(schema);
  };

  const handleDeleteField = (fieldToDelete: FieldSchema) => {
    if (
      confirm(
        `Вы уверены, что хотите удалить поле "${
          fieldToDelete.label || fieldToDelete.name
        }"?`
      )
    ) {
      const updatedFields = fields.filter(
        (field) => field.id !== fieldToDelete.id
      );
      setFields(updatedFields);
    }
  };

  const hasSchemaChanges = useMemo(() => {
    return JSON.stringify(fields) !== JSON.stringify(formSchema.fields);
  }, [fields, formSchema.fields]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleShowFormSchema}>
            <Eye className="h-4 w-4 mr-2" />
            Показать схему формы
          </Button>
          <Button
            variant="default"
            onClick={handleSubmitFormSchema}
            disabled={!hasSchemaChanges}
          >
            <Save className="h-4 w-4 mr-2" />
            {formSchema.id ? "Обновить" : "Создать"} схему формы
          </Button>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <ConstructorFormPreview
              fields={fields}
              onSubmitForm={showFormData}
              onEditField={handleEditField}
              onDeleteField={handleDeleteField}
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
        title={`Данные формы "${formSchema.name}"`}
        structure={formData.current}
      />

      {/* Модальное окно со схемой формы */}
      <StructurePreviewModal
        modal={{
          open: formSchemaModal.isOpen,
          onToggle: formSchemaModal.toggle,
          onClose: formSchemaModal.close,
        }}
        title={`Схема формы "${formSchema.name}"`}
        structure={generateFormSchema(formSchema.id || "generated-on-save")}
      />
    </>
  );
};
