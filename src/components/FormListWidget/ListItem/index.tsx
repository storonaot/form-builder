import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";

type ListItemProps = {
  id: string;
  name: string;
  description?: string;
  handleEdit: (id: string) => void;
  showPreview: (id: string) => void;
};

export const ListItem: FC<ListItemProps> = ({
  id,
  name,
  description,
  handleEdit,
  showPreview,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(id)}
              title="Редактировать"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={() => showPreview(id)}
              title="Предварительный просмотр"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
