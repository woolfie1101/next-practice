import { Categories } from "@/components/dashboard/search/categories";
import { getCategories } from "@/data/category";

const SearchPage = async () => {
  const categories = await getCategories();

  return (
    <div className="p-6">
      <Categories items={categories} />
    </div>
  );
};

export default SearchPage;
