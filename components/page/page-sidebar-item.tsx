"use client";

interface PageSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  pageId: string;
  isLocked: boolean;
}

export const PageSidebarItem = ({
  label,
  id,
  isCompleted,
  pageId,
  isLocked,
}: PageSidebarItemProps) => {
  return <div>{label}</div>;
};
