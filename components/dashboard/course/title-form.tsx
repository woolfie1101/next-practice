"use client";

import { editTitlePage } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditPageTitleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface TitleFormProps {
  initalData: {
    title: string;
  };
  pageId: string;
}

export const TitleForm = ({ initalData, pageId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initalData.title);
  const router = useRouter();

  const form = useForm<z.infer<typeof EditPageTitleSchema>>({
    resolver: zodResolver(EditPageTitleSchema),
    defaultValues: {
      title,
      pageId,
    },
  });

  const onSubmit = (values: z.infer<typeof EditPageTitleSchema>) => {
    console.log(values);
    startTransition(() => {
      editTitlePage(values)
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
          setTitle(values.title);
          form.setValue("title", values.title);
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
        제목
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
      {!isEditing && <p className="text-sm mt-2">{title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isPending} placeholder="제목" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Input type="hidden" name="pageId" value={pageId} />
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
