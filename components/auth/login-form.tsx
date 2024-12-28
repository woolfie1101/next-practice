"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";


import { CardWrapper } from "./card-wrapper"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/auth/login";
import { useTransition } from "react";

export const LoginForm = () => {
  const [isPending, startTransaction] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransaction(() => {
      login(values);
    })    
  };

  return (
    <CardWrapper
      headerLabel="환영합니다"
      backButtonLabel="계정이 없나요?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        > 
        <div className="space-y-4">
          <FormField 
            control={form.control}
            name="email"
            render={({field})=>(
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="example@google.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="password"
            render={({field})=>(
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
        >
          로그인
        </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}