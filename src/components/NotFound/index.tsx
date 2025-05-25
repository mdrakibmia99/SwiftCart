'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowLeft, Home, Compass } from 'lucide-react';
import image from '@/assets/404.png';
import { Button } from '../ui/button';

const NotFound = () => {
  const router = useRouter();

  return (
    <section className="bg-blue-50 dark:bg-gray-900">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <div className="relative w-64 h-64 mb-6">
            <Image
              src={image}
              alt="404 Not Found"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="text-primary" size={28} />
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-blue-400 md:text-3xl">
              Oops! Page Not Found
            </h4>
            <ShoppingBag className="text-primary" size={28} />
          </div>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            This product page might be out of stock or moved. Let&apos;s find
            you something great!
          </p>

          <div className="flex flex-col w-full mt-8 gap-4 sm:flex-row sm:w-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
              <span>Go Back</span>
            </button>

            <Button
              onClick={() => router.push('/')}
              className="flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-primary rounded-lg shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-primary"
            >
              <Home className="w-5 h-5" />
              <span>Take Me Home</span>
            </Button>
          </div>

          <div className="mt-8">
            <button
              onClick={() => router.push('/products')}
              className="flex items-center gap-2 text-sm text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Trending Products</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
