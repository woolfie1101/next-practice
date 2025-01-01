"use client";

import { editDescriptionPage } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  EditPageDescriptionSchema,
  EditPageTitleSchema,
  ItemTitleSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Item } from "@prisma/client";

import * as z from "zod";
import { createItem } from "@/actions/item";
import { ItemList } from "./item-list";

interface ItemsFormProps {
  initalData: {
    items: Item[];
  };
  pageId: string;
}

export const ItemsForm = ({ initalData, pageId }: ItemsFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ItemTitleSchema>>({
    resolver: zodResolver(ItemTitleSchema),
    defaultValues: {
      title: "",
      pageId,
    },
  });

  const onSubmit = (values: z.infer<typeof ItemTitleSchema>) => {
    startTransition(() => {
      createItem(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast(data.error);
          }
          if (data?.success) {
            form.reset();
            toogleCreating();
            router.refresh();
            toast(data.success);
          }
        })
        .catch(() => {
          toast("알수없는 문제가 발생했습니다.");
        });
    });
  };

  const toogleCreating = () => {
    setIsCreating(() => !isCreating);
  };

  const toogleUpdating = () => {
    setIsUpdating(() => !isUpdating);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        아이템
        <Button onClick={toogleCreating} variant="ghost">
          {isCreating ? (
            <>취소</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              추가
            </>
          )}
        </Button>
      </div>
      {isCreating && (
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
                    <Input disabled={isPending} placeholder="이름" {...field} />
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
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initalData.items.length && "text-slate-500 italic"
          )}
        >
          {!initalData.items.length && "아이템이 없습니다."}
          <ItemList
            onEdit={() => {}}
            onReorder={() => {}}
            items={initalData.items || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          위치를 옮길수 있어요
        </p>
      )}
    </div>
  );
};
