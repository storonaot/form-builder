import { useState } from "react";
import { CreateModal } from "./CreateModal";
import { Button } from "@/components/ui/button";

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
      <Button variant="outline" onClick={handleOpenModal}>
        Создать
      </Button>
      {isModalOpen && (
        <CreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};
