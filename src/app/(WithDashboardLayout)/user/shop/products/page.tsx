import ManageProducts from '@/components/modules/shop/product';
import { getAllProducts } from '@/services/Product';

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data: products, meta } = await getAllProducts(page, '10');
  return (
    <div>
      <ManageProducts products={products} meta={meta} page={page} />
    </div>
  );
};

export default ManageProductsPage;
