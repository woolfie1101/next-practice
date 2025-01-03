import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getProgress = async (pageId: string) => {
  const user = await currentUser();
  if (!user) {
    await signOut({ redirectTo: "/login", redirect: true });
    return 0;
  }

  const publishedItems = await db.item.findMany({
    where: {
      pageId,
      isPublished: true,
    },
    select: {
      id: true,
    },
  });

  const publishedItemsIds = publishedItems.map((item) => item.id);

  const validCompletedItems = await db.userProgress.count({
    where: {
      userId: user.id,
      itemId: {
        in: publishedItemsIds,
      },
      isComplete: true,
    },
  });

  const progressPercentage =
    (validCompletedItems / publishedItemsIds.length) * 100;

  return progressPercentage;
};
