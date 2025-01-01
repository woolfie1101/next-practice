"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ItemTitleSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createItem = async (values: z.infer<typeof ItemTitleSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }

  const validatedFields = ItemTitleSchema.safeParse(values);

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

  const lastItem = await db.item.findFirst({
    where: {
      pageId,
    },
    orderBy: {
      position: "desc",
    },
  });

  const newPosition = lastItem ? lastItem.position + 1 : 1;

  const item = await db.item.create({
    data: {
      title,
      pageId,
      position: newPosition,
    },
  });

  revalidatePath(`/admin/${pageId}`);

  return { success: "추가했습니다" };
};
