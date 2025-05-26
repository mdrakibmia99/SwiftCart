import FeaturedProducts from '@/components/modules/home/FeaturedProducts';
import FlashSale from '@/components/modules/home/FlashSale';
import Category from './_components/_category/CategoryModule';
import TopBrands from './_components/_brand/BrandModule';
import { HeroSection } from '@/components/modules/home/HeroSection';
import { Subscribe } from '@/components/modules/Newsletter';
import Tawk from './_components/_Tawk/Tawk';
import Testimonials from '@/components/modules/Testimonials';

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <FeaturedProducts />
      <FlashSale />
      <TopBrands />
      <Testimonials />
      <Subscribe />
      <Tawk />
    </div>
  );
};

export default HomePage;
