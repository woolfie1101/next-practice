"use client";

import { itemProgress } from "@/actions/item";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/store/use-confetti-store";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ProgressButtonProps {
  itemId: string;
  pageId: string;
  isCompleted?: boolean;
  nextItemId?: string;
}

export const PageProgressButton = ({
  itemId,
  pageId,
  isCompleted,
  nextItemId,
}: ProgressButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const Icon = isCompleted ? XCircle : CheckCircle;
  const confetti = useConfettiStore();

  const onClick = () => {
    startTransition(() => {
      itemProgress(pageId, itemId, !isCompleted)
        .then((data) => {
          if (data?.error) {
            toast(data.error);
          }
          if (data?.success) {
            toast(data.success);
            if (!isCompleted && !nextItemId) {
              confetti.onOpen();
            }
            if (!isCompleted && nextItemId) {
              router.push(`/page/${pageId}/item/${nextItemId}`);
            }
            router.refresh();
          }
        })
        .catch(() => {
          toast("알수없는 문제가 발생했습니다.");
        });
    });
  };

  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "미완료" : "완료"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
