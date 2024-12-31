"use client";

import { createPage } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateAdminPageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const CreatePage = () => {
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();
  const form = useForm<z.infer<typeof CreateAdminPageSchema>>({
    resolver: zodResolver(CreateAdminPageSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateAdminPageSchema>) => {
    startTransaction(() => {
      createPage(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast(data.error);
          }
          if (data?.success) {
            form.reset();
            toast(data.success);
            router.push(`/admin/${data.pageId}`);
          }
        })
        .catch(() => {
          toast("알수없는 문제가 발생했습니다.");
        });
    });
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">이름을 입력하세요.</h1>
        <p className="text-sm text-slate-600">나중에 변경 할 수 있습니다.</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="제목을 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>멋진 제목을 설정하세요</FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  취소
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                다음
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
