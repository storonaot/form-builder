"use client";

import { CreateFormWidget } from "@/components/CreateFormWidget";
import { FormListWidget } from "@/components/FormListWidget";
import { PageLayout } from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800 mb-2">
            Конструктор форм
          </h1>
          <p className="text-slate-500 text-lg">
            Создавайте и управляйте вашими формами
          </p>
        </div>
        <CreateFormWidget />
      </div>

      <div className="space-y-6">
        <FormListWidget />
      </div>
    </PageLayout>
  );
}
