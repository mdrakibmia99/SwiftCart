"use client";
import ProductCard from "@/components/ui/core/ProductCard";
import FilterSidebar from "./filterSidebar";
import { IProduct } from "@/types";

export const AllProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 my-10">
      {/* Sidebar */}
      <div className="w-full lg:max-w-xs">
        <FilterSidebar />
      </div>

      {/* Products */}
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
