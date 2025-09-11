import { CreateModal } from "./CreateModal";

export const CreateFormWidget = () => {
  const shhouldShowModal = false;

  return (
    <div>
      <button>Создать</button>
      {shhouldShowModal && <CreateModal />}
    </div>
  );
};
