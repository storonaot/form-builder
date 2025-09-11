import { FC } from "react";

type ListItemProps = {
  id: string;
  name: string;
  handleEdit: (id: string) => void;
  showPreview: (id: string) => void;
};

export const ListItem: FC<ListItemProps> = ({
  id,
  name,
  handleEdit,
  showPreview,
}) => {
  return (
    <div>
      <div>{name}</div>
      <button onClick={() => handleEdit(id)}>Редактировать</button>
      <button onClick={() => showPreview(id)}>Preview</button>
    </div>
  );
};
