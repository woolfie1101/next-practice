"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";

export const enroll = async (id: string) => {
  const user = await currentUser();
  if (!user || !user.id) {
    return await signOut({ redirectTo: "/login", redirect: true });
  }

  const page = await db.page.findUnique({
    where: {
      id,
    },
  });

  if (!page) {
    return { error: "잘못된 강의입니다." };
  }

  await db.purchase.upsert({
    where: {
      userId_pageId: {
        userId: user.id,
        pageId: id,
      },
    },
    update: {
      isComplete: true,
    },
    create: {
      userId: user.id,
      pageId: id,
      isComplete: true,
    },
  });

  revalidatePath(`/page/${page.id}`);

  return { success: "성공" };
};
