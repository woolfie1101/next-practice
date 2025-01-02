"use client";

import { deleteItem } from "@/actions/item";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ItemActionsProps {
  disabled: boolean;
  pageId: string;
  itemId: string;
  isPublished: boolean;
}

export const ItemActions = ({
  disabled,
  pageId,
  itemId,
  isPublished,
}: ItemActionsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    const values = {
      pageId,
      itemId,
    };
    startTransition(() => {
      deleteItem(values)
        .then((data) => {
          if (data?.error) {
            toast(data.error);
          }
          if (data?.success) {
            toast(data.success);
            router.refresh();
            router.push(`/admin/${pageId}`);
          }
        })
        .catch(() => {
          toast("알수없는 문제가 발생했습니다.");
        });
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => {}}
        disabled={disabled || isPending}
        variant="outline"
        size="sm"
      >
        {isPublished ? "비공개" : "공개"}
      </Button>
      <ConfirmModal
        title="정말 삭제하시겠습니까?"
        description="이 작업은 되돌릴수 없습니다."
        onConfirm={onDelete}
      >
        <Button size="sm" disabled={isPending}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
