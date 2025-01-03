"use server";

import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Page, Purchase } from "@prisma/client";

type PurchaseWithPages = Purchase & {
  page: Page;
};

const greoupByPage = (purchase: PurchaseWithPages[]) => {
  // 페이지 이름별 금액 { 페이지이름1:합계, 페이지이름2:합계,}
  const grouped: { [courseTitle: string]: number } = {};

  purchase.forEach((purchase) => {
    const pageTitle = purchase.page.title;
    if (!grouped[pageTitle]) {
      grouped[pageTitle] = 0;
    }
    grouped[pageTitle] += purchase.page.price!;
  });

  return grouped;
};

export const getAnalytics = async () => {
  const user = await currentUser();
  if (!user) {
    return await signOut({ redirectTo: "/login", redirect: true });
  }

  const purchase = await db.purchase.findMany({
    where: {
      page: {
        userId: user.id,
      },
    },
    include: {
      page: true,
    },
  });

  const groupedEarnings = greoupByPage(purchase);
  // const data = Object.entries(groupedEarnings).map((pageTitle, total) => ({
  //   name: pageTitle,
  //   total
  // }));
  const data = Object.entries(groupedEarnings).map(([pageTitle, total]) => ({
    name: pageTitle,
    total,
  }));

  const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalSales = purchase.length;

  return {
    data,
    totalRevenue,
    totalSales,
  };
};
