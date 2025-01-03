import { getPurchaseByPageId } from "@/data/purchase";
import { Item, Page, UserProgress } from "@prisma/client";
import { PageSidebarItem } from "./page-sidebar-item";
import { PageProgress } from "./page-progress";

interface PagesSidebarProps {
  page: Page & {
    items: (Item & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const PagesSidebar = async ({
  page,
  progressCount,
}: PagesSidebarProps) => {
  const purchase = await getPurchaseByPageId(page.id);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{page.title}</h1>
        <PageProgress variant="success" value={progressCount} />
      </div>
      <div className="flex flex-col w-full">
        {page.items.map((item) => (
          <PageSidebarItem
            key={item.id}
            id={item.id}
            label={item.title}
            isCompleted={!!item.userProgress?.[0]?.isComplete}
            pageId={page.id}
            isLocked={!item.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
