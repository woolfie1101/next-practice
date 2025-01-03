"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Category, Item, Page, Purchase } from "@prisma/client";
import { redirect } from "next/navigation";
import { getProgress } from "./progress";

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

interface getItemsBySearchProps {
  title?: string;
  categoryId?: string;
}

export type ItemsBySearchResult = Page & {
  category: Category | null;
  items: { id: string }[];
  progress: number | null;
  purchases: Purchase[];
};

export const getPagesBySearch = async ({
  title,
  categoryId,
}: getItemsBySearchProps): Promise<ItemsBySearchResult[]> => {
  const user = await currentUser();
  if (!user) {
    return await signOut({ redirectTo: "/login", redirect: true });
  }
  const pages = await db.page.findMany({
    where: {
      isPublished: true,
      title: {
        contains: title,
      },
      categoryId,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  const pagesWithProgress = await Promise.all(
    pages.map(async (page) => {
      if (page.purchases.length === 0) {
        return {
          ...page,
          progress: null,
        };
      }

      const progressPercentage = await getProgress(page.id);

      return {
        ...page,
        progress: progressPercentage || null,
      };
    })
  );

  return pagesWithProgress;
};

export const getPageByPageId = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return await signOut({ redirectTo: "/login", redirect: true });
  }

  const page = await db.page.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: user.id,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!page) {
    redirect("/search");
  }

  return page;
};

export const getPageForUser = async (pageId: string, itemId: string) => {
  const user = await currentUser();
  if (!user || !user.id) {
    return await signOut({ redirectTo: "/login", redirect: true });
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_pageId: {
        userId: user.id,
        pageId,
      },
    },
  });

  const page = await db.page.findUnique({
    where: {
      isPublished: true,
      id: pageId,
    },
    select: {
      price: true,
    },
  });

  const item = await db.item.findUnique({
    where: {
      id: itemId,
      isPublished: true,
    },
  });

  if (!page) {
    redirect("/");
  }

  if (!item) {
    redirect("/");
  }

  let nextItem: Item | null = null;

  if (item.isFree || purchase) {
    nextItem = await db.item.findFirst({
      where: {
        pageId,
        isPublished: true,
        position: {
          gt: item?.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });
  }

  const userProgress = await db.userProgress.findUnique({
    where: {
      userId_itemId: {
        userId: user.id,
        itemId,
      },
    },
  });

  return {
    item,
    page,
    nextItem,
    userProgress,
    purchase,
  };
};
