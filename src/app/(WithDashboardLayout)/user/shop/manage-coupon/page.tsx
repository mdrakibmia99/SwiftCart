import CouponTable from "@/components/modules/shop/manage-coupon/CouponTable";
import CreateCouponModal from "@/components/modules/shop/manage-coupon/CreateCouponModal";
import { getAllCoupon } from "@/services/Coupon";
import { ICoupon } from "@/types";


export default async function ManageCouponPage() {
  const result=await getAllCoupon();
    const coupons = result?.data?.result as ICoupon[];
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Manage Coupon</h1>
        <CreateCouponModal />
      </div>
      <div>
        <CouponTable
          coupons={coupons|| []}
          meta={{ page: 1, limit: 10, total: 100, totalPage: 10 }}
        />
      </div>
    </div>
  );
}
