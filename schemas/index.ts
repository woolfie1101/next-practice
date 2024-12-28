import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "필수 입력입니다.",
  }),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/^(?=.*[0-9])/, "숫자를 최소 1개 이상 포함해야 합니다.")
    .regex(/^(?=.*[!@#$%^&*])/, "특수문자를 최소 1개 이상 포함해야 합니다."),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "필수 입력입니다."
  }),
  password: z.string(),
  name: z.string(),
})