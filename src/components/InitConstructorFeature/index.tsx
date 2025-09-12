import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateModal } from "./CreateModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const InitConstructorFeature = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData: {
    name: string;
    description: string;
  }) => {
    const searchParams = new URLSearchParams({
      name: formData.name,
      description: formData.description,
    });
    router.push(`/create?${searchParams.toString()}`);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpenModal} className="gap-2">
        <Plus className="h-4 w-4" />
        Создать форму
      </Button>
      {isModalOpen && (
        <CreateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};
