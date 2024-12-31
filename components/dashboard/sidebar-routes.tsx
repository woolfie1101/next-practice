"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "대시보드",
    href: "/",
  },
  {
    icon: Compass,
    label: "검색",
    href: "/search",
  },
];

const adminRoutes = [
  {
    icon: List,
    label: "관리자 홈",
    href: "/admin/home",
  },
  {
    icon: BarChart,
    label: "분석",
    href: "/admin/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.includes("/admin");

  const routes = isAdminPage ? adminRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
