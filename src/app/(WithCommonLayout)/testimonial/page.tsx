import Link from 'next/link';

const TestimonialPage = () => {
  return (
    <div className="my-8 md:my-16 lg:my-24 px-4 sm:px-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-12">
        What Our Community Says
      </h1>
      <p className="text-lg dark:text-white py-4 max-w-3xl mx-auto text-center">
        Discover why thousands of buyers and sellers trust SwiftCart for their
        e-commerce needs. Hear directly from our community about their
        experiences and success stories.
      </p>

      <div className="space-y-12">
        {/* Featured Testimonials */}
        <section>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {/* Testimonial 1 - Seller */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative">
              <div className="absolute top-4 left-4 text-3xl text-gray-200 dark:text-gray-600">
                “
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 pt-4">
                SwiftCart transformed my small hobby into a full-time business.
                The seller tools helped me scale from 10 to 500+ monthly sales
                in just six months!
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold">Jamie Smith</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Handmade Jewelry Seller • 2,450+ Sales
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 - Buyer */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative">
              <div className="absolute top-4 left-4 text-3xl text-gray-200 dark:text-gray-600">
                “
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 pt-4">
                I&apos;ve found unique items here that I can&apos;t find
                anywhere else. The buyer protection gives me confidence in every
                purchase.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  MA
                </div>
                <div>
                  <h4 className="font-semibold">Maria Alvarez</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Collectibles Buyer • 127 Purchases
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seller Success Stories */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4 border-b dark:border-gray-700">
            Seller Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                    {['AB', 'CD', 'EF'][i]}
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      {['Anna B.', 'Carlos D.', 'Emma F.'][i]}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {['Vintage Clothing', 'Tech Gadgets', 'Home Decor'][i]}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {
                    [
                      'Reached $10k in sales within first 3 months!',
                      'Grew my customer base by 300% year-over-year',
                      'Turned my passion into a profitable business',
                    ][i]
                  }
                </p>
                <Link
                  href="#"
                  className="text-blue-500 text-sm hover:underline"
                >
                  Read full story →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Happy Buyers Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4 border-b dark:border-gray-700">
            Happy Buyers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
                    {['TJ', 'RK', 'ML', 'PS', 'DG', 'AS'][i]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {
                        [
                          'Tom J.',
                          'Riya K.',
                          'Mike L.',
                          'Priya S.',
                          'David G.',
                          'Anna S.',
                        ][i]
                      }
                    </h4>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {
                    [
                      'Found the perfect vintage camera!',
                      'Amazing customer service experience',
                      'Fast shipping and great packaging',
                      'Unique items at fair prices',
                      'Seller went above and beyond!',
                      'Will definitely shop here again',
                    ][i]
                  }
                </p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      className={`w-3 h-3 ${
                        starIdx < 5 ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Ready to Join Our Success Stories?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              href="/create-shop"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Selling Now
            </Link>
            <Link
              href="/products"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestimonialPage;
