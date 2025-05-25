import Link from 'next/link';

const BlogsPage = () => {
  return (
    <div className="my-8 md:my-16 lg:my-24 px-4 sm:px-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-12">
        SwiftCart Blog
      </h1>
      <p className="text-lg dark:text-white text-justify py-4">
        Welcome to the{' '}
        <Link href="/" className="font-semibold text-blue-500 hover:underline">
          SwiftCart
        </Link>{' '}
        blog – your ultimate resource for e-commerce success, selling
        strategies, and buying guides. Discover expert tips, marketplace trends,
        and inspiring stories to boost your online selling game or become a
        smarter shopper.
      </p>

      <div className="space-y-12">
        {/* Featured Articles Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4 border-b dark:border-gray-700">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {/* Article 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  <Link
                    href="/blogs/starting-online-store"
                    className="hover:text-blue-500"
                  >
                    From Zero to $10k: Launching Your First Online Store
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A step-by-step guide to setting up a successful SwiftCart
                  store, from product selection to your first sale.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>By Emma Wilson</span>
                  <span className="mx-2">•</span>
                  <span>June 15, 2023</span>
                </div>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  <Link
                    href="/blogs/product-photography"
                    className="hover:text-blue-500"
                  >
                    Master Product Photography on a Budget
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Professional-looking product photos using just your smartphone
                  - essential tips for sellers.
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>By David Martinez</span>
                  <span className="mx-2">•</span>
                  <span>June 2, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4 border-b dark:border-gray-700">
            Recent Posts
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {/* Post 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-800 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 rounded-full mb-2">
                  Seller Tips
                </span>
                <h3 className="text-lg font-bold mb-2">
                  <Link
                    href="/blogs/pricing-strategies"
                    className="hover:text-blue-500"
                  >
                    Pricing Strategies That Boost Sales
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Learn to price competitively while maintaining healthy profit
                  margins.
                </p>
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-full mb-2">
                  Buyer Guides
                </span>
                <h3 className="text-lg font-bold mb-2">
                  <Link
                    href="/blogs/safe-shopping"
                    className="hover:text-blue-500"
                  >
                    How to Shop Safely Online
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Essential tips for secure transactions and authentic product
                  verification.
                </p>
              </div>
            </div>

            {/* Post 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-800 bg-orange-100 dark:bg-orange-900 dark:text-orange-200 rounded-full mb-2">
                  Success Stories
                </span>
                <h3 className="text-lg font-bold mb-2">
                  <Link
                    href="/blogs/home-business-success"
                    className="hover:text-blue-500"
                  >
                    From Hobby to $5k/Month: A Home Business Journey
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  How one seller turned their crafting hobby into a thriving
                  business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seller Spotlight Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4 border-b dark:border-gray-700">
            Seller Spotlight
          </h2>
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4">
              &quot;How I Scaled My Vintage Store to 1,000+ Sales&quot;
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover the strategies behind this top-rated SwiftCart
              seller&apos;s success in the competitive vintage clothing market.
            </p>
            <Link
              href="/blogs/vintage-store-success"
              className="inline-flex items-center text-blue-500 hover:underline font-medium"
            >
              Read the success story
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogsPage;
