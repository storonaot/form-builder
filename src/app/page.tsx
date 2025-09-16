"use client";

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
          {/* Список форм */}
          <FormListWidget />
        </div>
      </PageContainer>
    </PageLayout>
  );
}
