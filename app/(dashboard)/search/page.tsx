import { getCategories } from "@/data/category";

const SearchPage = async () => {
  const categories = await getCategories();

  return <div className="p-6">카테고리</div>;
};

export default SearchPage;
