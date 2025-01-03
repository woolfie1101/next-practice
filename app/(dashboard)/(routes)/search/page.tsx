import { Categories } from "@/components/dashboard/search/categories";
import { PageList } from "@/components/dashboard/search/page-list";
import { SearchInput } from "@/components/dashboard/search/search-input";
import { getCategories } from "@/data/category";
import { getPagesBySearch } from "@/data/page";

interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { title, categoryId } = await searchParams;
  const categories = await getCategories();
  const pages = await getPagesBySearch({ title, categoryId });

  return (
    <>
      <div className="px-6 pt-6 block md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <PageList items={pages} />
      </div>
    </>
  );
};

export default SearchPage;
