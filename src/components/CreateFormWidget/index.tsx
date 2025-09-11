import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateModal } from "./CreateModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFormContext, Form } from "@/contexts/FormContext";

export const CreateFormWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { setCurrentForm, clearCurrentForm } = useFormContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCurrentForm();
  };

  const handleFormSubmit = (formData: {
    name: string;
    description: string;
  }) => {
    const newForm: Form = {
      ...formData,
      createdAt: new Date(),
      fields: [],
    };
    setCurrentForm(newForm);
    setIsModalOpen(false);
    router.push("/create");
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
