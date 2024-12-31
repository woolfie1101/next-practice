"use client";

import { editImageUrlPage } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";

interface ImageFormProps {
  initalData: {
    imageUrl: string | null;
  };
  pageId: string;
}

export const ImageForm = ({ initalData, pageId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(initalData.imageUrl || "");
  const router = useRouter();

  const onSubmit = (values: FormData) => {
    console.log(values);
    startTransition(() => {
      editImageUrlPage(values)
        .then((data) => {
          if (data?.error) {
            toast(data.error);
          }
          if (data?.success) {
            toogleEdit();
            // cache 문제
            const randomh = Math.random();
            setImageUrl(data.imageUrl + "?t=" + randomh);
            router.refresh();
            toast(data.success);
          }
        })
        .catch(() => {
          toast("알수없는 문제가 발생했습니다.");
        });
    });
  };

  const toogleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        이미지
        <Button onClick={toogleEdit} variant="ghost">
          {isEditing ? (
            <>취소</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              편집
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initalData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="업로드"
              fill
              className="object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <form action={onSubmit} className="space-y-4 mt-4">
          <Input type="file" name="file" />
          <Input type="hidden" name="pageId" value={pageId} />
          <div className="flex items-center gap-x-2">
            <Button disabled={isPending} type="submit">
              저장
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
