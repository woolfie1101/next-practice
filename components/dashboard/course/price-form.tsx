"use client";

import { editPrice } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatWon } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EditPriceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface PriceFormProps {
  initalData: {
    price: number | null;
  };
  pageId: string;
}

export const PriceForm = ({ initalData, pageId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [price, setPrice] = useState(initalData.price || 0);
  const router = useRouter();

  const form = useForm<z.infer<typeof EditPriceSchema>>({
    resolver: zodResolver(EditPriceSchema),
    defaultValues: {
      price,
      pageId,
    },
  });

  const onSubmit = (values: z.infer<typeof EditPriceSchema>) => {
    console.log(values);
    startTransition(() => {
      editPrice(values)
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
          setPrice(values.price);
          form.setValue("price", values.price);
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
        가격
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
            !price && "text-slate-500 italic"
          )}
        >
          {price ? formatWon(price) : "설정 가격이 없습니다."}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="가격"
                      step="0.05"
                      {...field}
                    />
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
