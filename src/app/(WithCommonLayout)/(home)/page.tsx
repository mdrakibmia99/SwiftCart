import FeaturedProducts from '@/components/modules/home/FeaturedProducts';
import FlashSale from '@/components/modules/home/FlashSale';
import Category from './_components/_category/CategoryModule';
import TopBrands from './_components/_brand/BrandModule';
import { HeroSection } from '@/components/modules/home/HeroSection';
import { Subscribe } from '@/components/modules/Newsletter';

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
      <div className="my-5">
        <Subscribe />
      </div>
    </div>
  );
};

export default HomePage;
