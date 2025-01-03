import { ItemsBySearchResult } from "@/data/page";

interface PageListProps {
  items: ItemsBySearchResult[];
}

export const PageList = ({ items }: PageListProps) => {
  return (
    <div>
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          페이지가 없습니다.
        </div>
      )}
    </div>
  );
};
