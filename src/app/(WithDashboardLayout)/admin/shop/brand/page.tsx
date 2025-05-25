import { getAllBrands } from "@/services/Brand";
import ManageBrands from "./_components";

const ProductBrandPage = async () => {
  const { data, meta } = await getAllBrands();
  return (
    <div>
      <ManageBrands brands={data} />
    </div>
  );
};

export default ProductBrandPage;
