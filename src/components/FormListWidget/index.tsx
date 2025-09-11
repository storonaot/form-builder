import { EmptyList } from "./EmptyList";
import { ListItem } from "./ListItem";

type FormItem = {
  id: string;
  name: string;
};

const mockFormList: FormItem[] = [];

export const FormListWidget = () => {
  const goToEditPage = (id: string) => {
    // тут переход на страницу /edit/:id
  };

  const goToPreviewPage = (id: string) => {
    // тут переход на страницу /preview/:id
  };

  return (
    <div>
      {mockFormList.length ? (
        <div>
          {mockFormList.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              name={item.name}
              handleEdit={goToEditPage}
              showPreview={goToPreviewPage}
            />
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};
