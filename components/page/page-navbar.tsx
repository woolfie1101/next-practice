import { Item, Page, UserProgress } from "@prisma/client";
import { NavbarRoutes } from "@/components/dashboard/navbar-routes";
import { PageMobileSidebar } from "./page-mobile-sidebar";

interface PageNavbarProps {
  page: Page & {
    items: (Item & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const PageNavbar = ({ page, progressCount }: PageNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shdow-sm">
      <PageMobileSidebar page={page} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
