export interface ICoupon {
  _id: string;
  code: string;
  shop: string; // You can replace this with a shop object if you populate it later
  discountType: 'Percentage' | 'Flat'; // Assuming only these two types exist
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  startDate: string; // ISO string format
  endDate: string;   // ISO string format
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}