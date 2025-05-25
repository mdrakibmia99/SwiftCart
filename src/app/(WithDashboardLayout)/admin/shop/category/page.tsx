
import { getAllCategories } from "@/services/Category";
import ManageCategories from "./_components";

const ProductCategoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data: categories, meta } = await getAllCategories(page, '10');
  return (
    <div>
      <ManageCategories categories={categories} meta={meta} page={page} />
    </div>
  );
};

export default ProductCategoryPage;
