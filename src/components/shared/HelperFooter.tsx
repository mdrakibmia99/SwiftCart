'use client';

import { ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HelperFooter = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto text-center">
      <div className="flex flex-col w-full mt-8 gap-4 sm:flex-row sm:w-auto">
        <button
          onClick={() => router.back()}
          className="cursor-pointer flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-secondary border border-gray-200 rounded-lg shadow-sm hover:bg-primary hover:text-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>

        <button
          onClick={() => router.push('/')}
          className="cursor-pointer flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-primary rounded-lg shadow-sm hover:bg-secondary hover:text-primary dark:bg-green-700 dark:hover:bg-secondary"
        >
          <Home className="w-5 h-5" />
          <span>Take Me Home</span>
        </button>
      </div>
    </div>
  );
};

export default HelperFooter;
