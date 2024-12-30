"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if(!validatedFields.success) {
    return {error: "Invalid fields!"}
  }

  const {email, password} = validatedFields.data;

  try {
    await signIn("credentials", {
      email, 
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });
  } catch(error){
    if(error instanceof AuthError){
      switch(error.type) {
        case "CredentialsSignin":
          return { error: "인증 오류!"}
        default:
          return { error: "알수 없는 오류"}
      }
    }
    throw error;
  }

  return { success: "Email sent!"}
}