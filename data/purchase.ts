"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getPurchaseByPageId = async (pageId: string) => {
  const user = await currentUser();
  if (!user || !user.id) {
    await signOut({ redirectTo: "/login", redirect: true });
    return null;
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_pageId: {
        userId: user.id,
        pageId,
      },
    },
  });

  return purchase;
};
