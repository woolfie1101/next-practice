"use client";

import { editDescriptionItem } from "@/actions/item";
import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EditItemDescriptionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface ItemDescriptionFormProps {
  initalData: {
    description: string | null;
  };
  pageId: string;
  itemId: string;
}

export const ItemDescriptionForm = ({
  initalData,
  pageId,
  itemId,
}: ItemDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState(initalData.description || "");
  const router = useRouter();

  const form = useForm<z.infer<typeof EditItemDescriptionSchema>>({
    resolver: zodResolver(EditItemDescriptionSchema),
    defaultValues: {
      description,
      pageId,
      itemId,
    },
  });

  const onSubmit = (values: z.infer<typeof EditItemDescriptionSchema>) => {
    startTransition(() => {
      editDescriptionItem(values)
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
          setDescription(values.description);
          form.setValue("description", values.description);
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
            !description && "text-slate-500 italic"
          )}
        >
          {description || "설명이 없습니다."}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor disabled={isPending} {...field} />
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
