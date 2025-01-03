import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Item, Page, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import { PagesSidebar } from "./page-sidebar";

interface PageMobileSidebarProps {
  page: Page & {
    items: (Item & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const PageMobileSidebar = ({
  page,
  progressCount,
}: PageMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <SheetTitle>
          <PagesSidebar page={page} progressCount={progressCount} />
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
};
