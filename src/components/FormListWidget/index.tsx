import { EmptyList } from "./EmptyList";
import { ListItem } from "./ListItem";

type FormItem = {
  id: string;
  name: string;
  description?: string;
};

const mockFormList: FormItem[] = [
  {
    id: "1",
    name: "Форма регистрации",
    description: "Сбор данных новых пользователей с валидацией email и пароля",
  },
  {
    id: "2",
    name: "Обратная связь",
    description: "Форма для получения отзывов и предложений от клиентов",
  },
  {
    id: "3",
    name: "Заказ товара",
    description: "Оформление заказа с выбором товаров и способа доставки",
  },
  {
    id: "4",
    name: "Анкета сотрудника",
    description: "Сбор персональных данных и контактной информации",
  },
  {
    id: "5",
    name: "Оценка сервиса",
    description: "Опрос удовлетворенности качеством предоставляемых услуг",
  },
  {
    id: "6",
    name: "Подписка на рассылку",
    description: "Форма подписки на email-уведомления и новости",
  },
];

const mockFormListEmpty = [];

export const FormListWidget = () => {
  const goToEditPage = (id: string) => {
    // тут переход на страницу /edit/:id
  };

  const goToPreviewPage = (id: string) => {
    // тут переход на страницу /preview/:id
  };

  return (
    <div>
      {mockFormListEmpty.length ? (
        <div className="space-y-4">
          {mockFormList.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
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
