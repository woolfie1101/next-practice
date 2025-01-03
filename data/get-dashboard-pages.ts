"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getProgress } from "./progress";
import { ItemsBySearchResult } from "./page";

export const getDashboardPages = async () => {
  const user = await currentUser();
  if (!user) {
    await signOut({ redirectTo: "/login", redirect: true });
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
  const purchasedPage = await db.purchase.findMany({
    where: {
      userId: user.id,
    },
    select: {
      page: {
        include: {
          category: true,
          items: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
          purchases: {
            where: {
              userId: user.id,
            },
          },
        },
      },
    },
  });

  const pages = purchasedPage.map(
    (purchase) => purchase.page
  ) as ItemsBySearchResult[];
  for (const page of pages) {
    const progress = await getProgress(page.id);
    page["progress"] = progress;
  }

  const completedCourses = pages.filter((page) => page.progress === 100);
  const coursesInProgress = pages.filter((page) => (page.progress ?? 0) < 100);

  return {
    completedCourses,
    coursesInProgress,
  };
};
