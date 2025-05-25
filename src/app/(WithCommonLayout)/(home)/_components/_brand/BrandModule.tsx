import NMContainer from "@/components/ui/core/NMContainer";
import { getAllBrands } from "@/services/Brand";
import { IBrand } from "@/types";
import BrandCard from "./BrandCard";

const TopBrands = async () => {
  const { data: brands } = await getAllBrands();

  return (
    <NMContainer className="my-16">
      {/* Simple centered header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Our Brands
        </h2>
        <p className="text-gray-500 mt-2">
          Trusted by industry leaders worldwide
        </p>
      </div>

      {/* Clean grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {brands?.slice(0, 6).map((brand: IBrand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </NMContainer>
  );
};

export default TopBrands;