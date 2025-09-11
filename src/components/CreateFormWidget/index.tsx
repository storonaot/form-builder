import { useState } from "react";
import { CreateModal } from "./CreateModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const CreateFormWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpenModal} className="gap-2">
        <Plus className="h-4 w-4" />
        Создать форму
      </Button>
      {isModalOpen && (
        <CreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};
