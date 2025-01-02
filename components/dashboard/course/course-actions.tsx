"use client";

import { deletePage, publishPage, unpublishPage } from "@/actions/admin";
import { deleteItem, publishItem, unpublishItem } from "@/actions/item";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { useConfettiStore } from "@/hooks/store/use-confetti-store";

interface PageActionsProps {
  disabled: boolean;
  pageId: string;
  isPublished: boolean;
}

export const PageActions = ({
  disabled,
  pageId,
  isPublished,
}: PageActionsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const confetti = useConfettiStore();

  const onClick = () => {
    const values = {
      pageId,
    };
    if (isPublished) {
      startTransition(() => {
        unpublishPage(values)
          .then((data) => {
            if (data?.error) {
              toast(data.error);
            }
            if (data?.success) {
              toast(data.success);
              router.refresh();
            }
          })
          .catch(() => {
            toast("알수없는 문제가 발생했습니다.");
          });
      });
    } else {
      startTransition(() => {
        publishPage(values)
          .then((data) => {
            if (data?.error) {
              toast(data.error);
            }
            if (data?.success) {
              confetti.onOpen();
              toast(data.success);
              router.refresh();
            }
          })
          .catch(() => {
            toast("알수없는 문제가 발생했습니다.");
          });
      });
    }
  };

  const onDelete = () => {
    const values = {
      pageId,
    };
    startTransition(() => {
      deletePage(values)
        .then((data) => {
          if (data?.error) {
            toast(data.error);
          }
          if (data?.success) {
            toast(data.success);
            router.refresh();
            router.push(`/admin/home`);
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
        onClick={onClick}
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
