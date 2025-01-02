"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const getPage = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    await signOut({ redirectTo: "/login", redirect: true });
    return;
  }
  const page = await db.page.findUnique({
    where: {
      id,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      items: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!page) {
    redirect("/");
  }

  return page;
};

export const getPagesByCreator = async () => {
  const user = await currentUser();
  if (!user) {
    await signOut({ redirectTo: "/login", redirect: true });
    return [];
  }
  const pages = await db.page.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return pages || [];
};
