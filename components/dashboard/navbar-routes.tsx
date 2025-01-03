"use client";

import { UserButton } from "@/components/auth/user-button";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search/search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  const isPagesPage = pathname?.startsWith("/page");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isAdminPage || isPagesPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/admin/home">
            <Button size="sm" variant="ghost">
              관리자
            </Button>
          </Link>
        )}
        <UserButton />
      </div>
    </>
  );
};
