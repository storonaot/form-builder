import { CreateModal } from "./CreateModal";
import { Button } from "@/components/ui/button";

export const CreateFormWidget = () => {
  const shhouldShowModal = false;

  return (
    <div>
      <Button variant="outline">Создать</Button>
      {shhouldShowModal && <CreateModal />}
    </div>
  );
};
