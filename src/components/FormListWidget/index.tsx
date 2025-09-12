import { EmptyList } from "./EmptyList";
import { ListItem } from "./ListItem";
import { useFormsStorage } from "@/lib/hooks/use-forms-storage";

export const FormListWidget = () => {
  const { forms } = useFormsStorage();

  const goToEditPage = (id: string) => {
    // TODO: переход на страницу /edit/:id
    console.log("Переход к редактированию формы:", id);
  };

  const goToPreviewPage = (id: string) => {
    // TODO: переход на страницу /preview/:id
    console.log("Переход к превью формы:", id);
  };

  return (
    <div>
      {forms.length > 0 ? (
        <div className="space-y-4">
          {forms.map((form) => (
            <ListItem
              key={form.id}
              id={form.id}
              name={form.name}
              description={form.description}
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
