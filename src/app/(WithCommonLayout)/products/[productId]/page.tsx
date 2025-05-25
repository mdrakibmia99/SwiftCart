import ProductBanner from '@/components/modules/products/banner';
import ProductDetails from '@/components/modules/products/productDetails';
import SCContainer from '@/components/ui/core/SCContainer';
import { getSingleProduct } from '@/services/Product';

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);

  return (
    <SCContainer>
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <div className="my-5">
        <ProductDetails product={product} />
      </div>
    </SCContainer>
  );
};

export default ProductDetailsPage;
