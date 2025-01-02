"use client";

import { editAccessItem, editDescriptionItem } from "@/actions/item";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EditItemAccessSchema, EditItemDescriptionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface ItemAccessFormProps {
  initalData: {
    isFree: boolean;
  };
  pageId: string;
  itemId: string;
}

export const ItemAccessForm = ({
  initalData,
  pageId,
  itemId,
}: ItemAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isFree, setIsFree] = useState(initalData.isFree);

  const router = useRouter();

  const form = useForm<z.infer<typeof EditItemAccessSchema>>({
    resolver: zodResolver(EditItemAccessSchema),
    defaultValues: {
      isFree: !!isFree,
      pageId,
      itemId,
    },
  });

  const onSubmit = (values: z.infer<typeof EditItemAccessSchema>) => {
    startTransition(() => {
      editAccessItem(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast(data.error);
          }
          if (data?.success) {
            form.reset();
            toogleEdit();
            router.refresh();
            toast(data.success);
          }
          setIsFree(values.isFree);
          form.setValue("isFree", values.isFree);
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
        세부 내용
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
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2 whitespace-pre-wrap",
            !isFree && "text-slate-500 italic"
          )}
        >
          {!isFree ? "공개 중입니다." : "허용된 사람만 접근 가능합니다."}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Input type="hidden" name="pageId" value={pageId} />
            <Input type="hidden" name="itemId" value={itemId} />
            <div className="flex items-center gap-x-2">
              <Button disabled={isPending} type="submit">
                저장
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
