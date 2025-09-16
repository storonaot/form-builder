"use client";

import { PageLayout } from "@/components/PageLayout";
import { ConstructorWidget } from "@/components/ConstructorWidget";
import { FormSchema } from "@/components/types.ts";
import { useFormsStorage } from "@/lib/hooks/use-forms-storage";
import { useParams, useRouter } from "next/navigation";
import { isString } from "@/lib/type-guards";
import { PageContainer } from "@/components/PageContainer";

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams();

  const { getForm, updateForm } = useFormsStorage();

  const formSchema = getForm(isString(id) ? id : "");

  const handleUpdateSchema = (formSchema: FormSchema) => {
    if (!formSchema?.id) throw new Error("Form ID is required");

    updateForm(formSchema.id, formSchema);
    alert(`Форма "${formSchema.name}" успешно обновлена!`);
    router.push(`/`);
  };

  return (
    <PageLayout>
      <PageContainer
        title={formSchema?.name || "title: Not found"}
        subtitle={formSchema?.description || "description: Not found"}
        onBack={() => router.push("/")}
      >
        {formSchema ? (
          <ConstructorWidget
            onFormSchemaSubmit={handleUpdateSchema}
            formSchema={formSchema}
          />
        ) : (
          <div>Form not found</div>
        )}
      </PageContainer>
    </PageLayout>
  );
}
