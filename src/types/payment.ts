export interface IPayment {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profilePhoto?: string;
  };
  order: {
    _id: string;
    products: Array<{
      product: string;
      quantity: number;
      price: number;
    }>;
    status: string;
    paymentStatus: string;
    totalAmount: number;
  };
  shop: {
    _id: string;
    shopName: string;
    contactNumber: string;
  };
  method: string;
  status: 'Paid' | 'Pending' | 'Failed';
  transactionId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}