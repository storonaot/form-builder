"use client";

import { InitConstructorFeature } from "@/components/shared/features/InitConstructorFeature";
import { FormListWidget } from "@/components/FormList";
import { PageLayout } from "@/components/layouts/PageLayout";
import { PageContainer } from "@/components/layouts/PageContainer";

export default function HomePage() {
  return (
    <PageLayout>
      <PageContainer
        title="Конструктор форм"
        subtitle="Создавайте и управляйте вашими формами"
      >
        <div className="space-y-8">
          {/* Кнопка создания формы - справа с отступом снизу */}
          <div className="flex justify-end">
            <InitConstructorFeature />
          </div>

          {/* Список форм */}
          <FormListWidget />
        </div>
      </PageContainer>
    </PageLayout>
  );
}
