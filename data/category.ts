"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getCategories = async () => {
  const user = currentUser();
  if (!user) {
    await signOut({ redirectTo: "/login", redirect: true });
    return [];
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!categories) {
    return [];
  }

  return categories;
};
