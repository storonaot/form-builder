import { CreateFormWidget } from "@/components/CreateFormWidget";
import { FileText } from "lucide-react";

export const EmptyList = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Формы не найдены</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            У вас пока нет созданных форм. Создайте первую форму, чтобы начать
            работу.
          </p>
        </div>
        <CreateFormWidget />
      </div>
    </div>
  );
};
