import { Item, Page, UserProgress } from "@prisma/client";

interface PagesSidebarProps {
  page: Page & {
    items: (Item & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const PagesSidebar = ({ page, progressCount }: PagesSidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{page.title}</h1>
        {/* 진행상태 */}
      </div>
      <div className="flex flex-col w-full">
        {page.items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
};
