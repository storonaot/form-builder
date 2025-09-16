import { FC, PropsWithChildren } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

type PageContainerProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  onBack?: () => void;
}>;

export const PageContainer: FC<PageContainerProps> = ({
  title,
  subtitle,
  onBack,
  children,
}) => {
  return (
    <div className="container mx-auto py-8">
      {/* Заголовок с абсолютно позиционированной стрелкой */}
      <div className="relative mb-8">
        {/* Стрелка назад - абсолютно позиционирована слева */}
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute -left-12 top-0 h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Заголовок и описание */}
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
        </div>
      </div>

      {/* Контент */}
      <div>{children}</div>
    </div>
  );
};
