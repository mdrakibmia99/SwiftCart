import PaymentAfter from '@/components/modules/PaymentAfter';
import { validatePayment } from '@/services/Payment';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ValidationPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { tran_id } = await searchParams;
  const res = await validatePayment(tran_id as string);

  return (
    <>
      <PaymentAfter
        response={res}
        icon={'ShieldCheck'}
        pageName="Payment Successful!"
        description="Your payment is validated successfully. Take a ScreenShot before refreshing or leaving this page for further queries."
        href="/"
        buttonText="Go to Home"
      />
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-5">
              <ShieldCheck className="size-40 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful
            </h1>
            <p className="text-gray-600 mb-6 text-center">
              Your payment is being validated. Please wait while we process your
              transaction.
            </p>

            <Link href="/" legacyBehavior>
              <Button>Go to Home</Button>
            </Link>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ValidationPage;
