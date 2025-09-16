"use client";

import { InitConstructorFeature } from "@/components/InitConstructorFeature";
import { FormListWidget } from "@/components/FormListWidget";
import { PageLayout } from "@/components/PageLayout";
import { PageContainer } from "@/components/PageContainer";

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
