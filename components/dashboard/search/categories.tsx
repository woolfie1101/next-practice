"use client";

import { Category } from "@prisma/client";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
  "음악": FcMusic,
  "사진": FcOldTimeCamera,
  "건강": FcSportsMode,
  "금융": FcSalesPerformance,
  "컴퓨터 사이언스": FcEngineering,
  "영상": FcFilmReel,
  "엔지니어링": FcMultipleDevices,
};

interface CategoriesProps {
  items: Category[];
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
