import { useRouter } from "next/navigation";
import { CreateModal } from "./CreateModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModalState } from "@/components/ui/Modal/useModalState";

export const InitConstructorFeature = () => {
  const router = useRouter();
  const modal = useModalState();

  const handleFormSubmit = (formData: {
    name: string;
    description: string;
  }) => {
    const searchParams = new URLSearchParams({
      name: formData.name,
      description: formData.description,
    });
    router.push(`/create?${searchParams.toString()}`);
    modal.close();
  };

  return (
    <div>
      <Button onClick={modal.open} className="gap-2">
        <Plus className="h-4 w-4" />
        Создать форму
      </Button>
      <CreateModal
        isOpen={modal.isOpen}
        onToggle={modal.toggle}
        onSubmit={handleFormSubmit}
        onClose={modal.close}
      />
    </div>
  );
};
