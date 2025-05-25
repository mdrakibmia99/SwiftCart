
import { getAllCategories } from "@/services/Category";
import ManageCategories from "./_components";

const ProductCategoryPage = async () => {
  const { data, meta } = await getAllCategories();
  return (
    <div>
      <ManageCategories categories={data} />
    </div>
  );
};

export default ProductCategoryPage;
