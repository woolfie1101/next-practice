"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { enroll } from "@/actions/enroll";
import { toast } from "sonner";

interface EnrollButtonProps {
  pageId: string;
}

export const EnrollButton = ({ pageId }: EnrollButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      enroll(pageId).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.info(data.success);
        }
      });
    });
  };
  return (
    <Button onClick={onClick} size="sm" className="w-full md:w-auto">
      신청
    </Button>
  );
};
