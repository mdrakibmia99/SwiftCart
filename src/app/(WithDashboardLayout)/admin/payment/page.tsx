import { getAllPaymentsForAdmin } from '@/services/Payment';
import ManagePayments from './_components/ManagePayment';


const PaymentPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const { page } = await searchParams;
  const { data: payments, meta } = await getAllPaymentsForAdmin(page, '10');

  return (
    <div>
      <ManagePayments payments={payments} meta={meta} page={page} />
    </div>
  );
};

export default PaymentPage;