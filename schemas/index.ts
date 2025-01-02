import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "필수 입력입니다.",
  }),
  password: z.string(),
  // .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  // .regex(/^(?=.*[0-9])/, "숫자를 최소 1개 이상 포함해야 합니다.")
  // .regex(/^(?=.*[!@#$%^&*])/, "특수문자를 최소 1개 이상 포함해야 합니다."),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "필수 입력입니다.",
  }),
  password: z.string().min(1, {
    message: "비밀번호를 입력해주세요.",
  }),
  name: z.string().min(1, {
    message: "이름을 입력해주세요.",
  }),
});

export const CreateAdminPageSchema = z.object({
  title: z.string().min(1, {
    message: "제목을 입력하세요.",
  }),
});

export const EditPageTitleSchema = z.object({
  title: z.string().min(1, {
    message: "제목을 입력하세요.",
  }),
  pageId: z.string(),
});

export const EditPageDescriptionSchema = z.object({
  description: z.string().min(1, {
    message: "설명을 입력하세요.",
  }),
  pageId: z.string(),
});

export const EditCategorySchema = z.object({
  categoryId: z.string(),
  pageId: z.string(),
});

export const CreateCategorySchema = z.object({
  pageId: z.string(),
});

export const EditPriceSchema = z.object({
  price: z.coerce.number(),
  pageId: z.string(),
});

export const ItemTitleSchema = z.object({
  title: z.string(),
  pageId: z.string(),
});

export const EditItemTitleSchema = z.object({
  title: z.string().min(1, {
    message: "제목을 입력하세요.",
  }),
  pageId: z.string(),
  itemId: z.string(),
});

export const EditItemDescriptionSchema = z.object({
  description: z.string().min(1, {
    message: "설명을 입력하세요.",
  }),
  pageId: z.string(),
  itemId: z.string(),
});

export const EditItemAccessSchema = z.object({
  isFree: z.boolean().default(false),
  pageId: z.string(),
  itemId: z.string(),
});

export const ItemSchema = z.object({
  pageId: z.string(),
  itemId: z.string(),
});
