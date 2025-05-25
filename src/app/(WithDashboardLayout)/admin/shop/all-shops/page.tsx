// app/dashboard/shops/page.tsx

import { deleteShop, getAllShops } from './_actions';
import ShopTable from './_components/ShopTable';

export default async function ShopsPage() {
  const shops = await getAllShops();

  const handleDelete = async (shopId: string) => {
    'use server';

    try {
      await deleteShop(shopId);
      // Revalidate data or refresh page
      // revalidatePath('/dashboard/shops');
    } catch (error) {
      console.error('Failed to delete shop:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-6  bg-white min- rounded-xl min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl p-4 font-bold">Shops Management</h1>
      </div>

      <ShopTable shops={shops?.data} loading={false} onDelete={handleDelete} />
    </div>
  );
}
