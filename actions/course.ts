"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateAdminPageSchema, EditPageTitleSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createPage = async (
  values: z.infer<typeof CreateAdminPageSchema>
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }
  const validatedFields = CreateAdminPageSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return { error: "Invalid fields!" };
  }

  const { title } = validatedFields.data;

  const page = await db.page.create({
    data: {
      title,
      userId: user.id,
    },
  });

  revalidatePath(`/admin/${page.id}`);

  return { success: "생성 성공했습니다", pageId: page.id };
};

export const editTitlePage = async (
  values: z.infer<typeof EditPageTitleSchema>
) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = EditPageTitleSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, pageId } = validatedFields.data;

  const page = await db.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!page) {
    return { error: "잘못된 정보입니다." };
  }

  await db.page.update({
    where: {
      id: page.id,
    },
    data: {
      title: title,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "제목 수정 성공했습니다" };
};
