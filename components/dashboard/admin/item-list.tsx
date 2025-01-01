"use client";

import { Item } from "@prisma/client";

interface ItemListProps {
  items: Item[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ItemList = ({ items, onReorder, onEdit }: ItemListProps) => {
  return <div>Item 목록</div>;
};
