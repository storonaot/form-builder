import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Nullable } from "@/lib/utility-types";

type Props<T extends object> = {
  modal: {
    open: boolean;
    onToggle: (open: boolean) => void;
    onClose: () => void;
  };
  title: string;
  structure?: Nullable<T>;
};

export const StructurePreviewModal = <T extends object>({
  modal,
  structure,
  title,
}: Props<T>) => {
  return (
    <Dialog open={modal.open} onOpenChange={modal.onToggle}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            {structure ? (
              <pre className="bg-white p-3 rounded border text-sm overflow-auto max-h-60">
                {JSON.stringify(structure, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">Нет данных</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={modal.onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
