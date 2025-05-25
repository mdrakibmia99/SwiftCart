type Specification = {
  processor: string;
  ram: string;
  storage: string;
  display: string;
};

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


export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  category: {
    _id: string;
    name: string;
  };
  imageUrls: string[];
  isActive: boolean;
  shop: {
    _id: string;
    shopName: string;
  };
  brand: {
    _id: string;
    name: string;
  };
  averageRating: number;
  ratingCount: number;
  availableColors: string[];
  specification: Specification;
  keyFeatures: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  offerPrice: number;
}
