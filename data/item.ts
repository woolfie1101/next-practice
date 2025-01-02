"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const getItem = async (pageId: string, id: string) => {
  const user = currentUser();
  if (!user) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }
  const item = await db.item.findUnique({
    where: {
      id,
      pageId,
    },
  });

  if (!item) {
    redirect("/");
  }
  return item;
};
