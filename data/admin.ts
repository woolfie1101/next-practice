"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, RedirectType } from "next/navigation";

export const getPage = async (id: string) => {
  const user = currentUser();
  if (!user) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }
  const page = await db.page.findUnique({
    where: {
      id,
    },
  });

  // if (!page) {
  //   redirect("/", RedirectType.replace);
  // }
  return page;
};
