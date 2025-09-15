import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";

type ListItemProps = {
  id: string;
  name: string;
  description?: string;
  handleEdit: (id: string) => void;
  showPreview: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const ListItem: FC<ListItemProps> = ({
  id,
  name,
  description,
  handleEdit,
  showPreview,
  handleDelete,
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
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(id)}
              title="Удалить форму"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
