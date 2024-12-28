"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if(!validatedFields.success) {
    return {error: "입력이 잘못되었습니다."}
  }

  console.log(values)
  return { success: "이메일 전송했습니다."}
}