import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
}

interface FormData {
  title: string;
  description: string;
}

export const CreateModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      onSubmit({
        name: data.title,
        description: data.description,
      });
      reset();
    } catch (error) {
      console.error("Ошибка создания формы:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>Создать новую форму</DialogTitle>
            <DialogDescription>
              Введите название и описание для вашей новой формы.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Название формы *</Label>
              <Input
                id="title"
                placeholder="Введите название формы"
                {...register("title", {
                  required: "Название формы обязательно",
                  minLength: {
                    value: 2,
                    message: "Название должно содержать минимум 2 символа",
                  },
                })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Краткое описание</Label>
              <Textarea
                id="description"
                placeholder="Описание формы (необязательно)"
                {...register("description")}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Создание..." : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
