"use client";

import { CreateFormWidget } from "@/components/CreateFormWidget";
import { FormListWidget } from "@/components/FormListWidget";

export default function Home() {
  return (
    <div>
      <div>
        <div>Заголовок</div>
        <CreateFormWidget />
      </div>
      <FormListWidget />
    </div>
  );
}
