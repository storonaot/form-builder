"use client";

import { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationGuardProps {
  children: ReactNode;
  onConfirm: () => void;
  isDirty?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationGuard = ({
  children,
  onConfirm,
  isDirty = false,
  title = "Подтверждение действия",
  description = "У вас есть несохраненные изменения. Если вы продолжите, текущие настройки будут потеряны.",
  confirmText = "Продолжить",
  cancelText = "Отмена",
}: ConfirmationGuardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const handleChildClick = (e: React.MouseEvent) => {
    if (isDirty) {
      e.preventDefault();
      e.stopPropagation();
      setPendingAction(() => onConfirm);
      setIsDialogOpen(true);
    } else {
      onConfirm();
    }
  };

  const handleConfirm = () => {
    if (pendingAction) {
      pendingAction();
    }
    setIsDialogOpen(false);
    setPendingAction(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setPendingAction(null);
  };

  return (
    <>
      <div onClick={handleChildClick}>{children}</div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              {cancelText}
            </Button>
            <Button onClick={handleConfirm} variant="destructive">
              {confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
