import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="my-8 md:my-16 lg:my-24 px-4 sm:px-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-12">
        About SwiftCart
      </h1>
      <p className="text-lg dark:text-white text-justify py-4">
        Welcome to{' '}
        <Link href="/" className="font-semibold text-blue-500 hover:underline">
          SwiftCart
        </Link>{' '}
        – your premier online marketplace for buying and selling new and
        pre-loved items. We connect millions of buyers and sellers worldwide,
        offering a secure platform to discover amazing products and grow your
        business.
      </p>

      <div className="space-y-8">
        {/* Our Mission */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">
            Our Mission
          </h2>
          <p className="dark:text-white text-justify">
            At SwiftCart, we empower commerce by providing an accessible
            platform where anyone can sell their products and everyone can find
            exactly what they need. Our goal is to create seamless transactions
            while fostering a community-driven marketplace that values trust and
            innovation.
          </p>
        </section>

        {/* Our Story */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">Our Story</h2>
          <p className="dark:text-white text-justify">
            Founded in 2023 by a team of e-commerce enthusiasts, SwiftCart began
            as a solution to fragmented online selling experiences. Today,
            we&apos;ve grown into a global marketplace supporting small
            businesses and individual entrepreneurs while helping buyers
            discover unique products across countless categories.
          </p>
        </section>

        {/* Why Choose Us? */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">
            Why Choose SwiftCart?
          </h2>
          <ul className="list-disc list-inside dark:text-white space-y-3 text-justify">
            <li>
              <span className="font-semibold">Secure Transactions:</span>{' '}
              Protected payments and escrow services ensure safe buying and
              selling
            </li>
            <li>
              <span className="font-semibold">Diverse Marketplace:</span> From
              electronics to fashion, home goods to collectibles - find it all
            </li>
            <li>
              <span className="font-semibold">Seller Empowerment:</span> Easy
              listing tools, analytics dashboard, and promotional features
            </li>
            <li>
              <span className="font-semibold">Buyer Assurance:</span> Rating
              system and buyer protection programs for confident shopping
            </li>
            <li>
              <span className="font-semibold">Community Support:</span> 24/7
              customer service and active seller forums
            </li>
          </ul>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">Our Values</h2>
          <p className="dark:text-white text-justify">
            At SwiftCart, we operate on three core principles:
          </p>
          <ul className="list-disc list-inside dark:text-white space-y-3 mt-3 text-justify">
            <li>
              <span className="font-semibold">Customer-Centric:</span>{' '}
              Prioritizing user experience in every decision
            </li>
            <li>
              <span className="font-semibold">Innovation:</span> Continuously
              improving our platform with cutting-edge features
            </li>
            <li>
              <span className="font-semibold">Integrity:</span> Maintaining
              transparent operations and ethical practices
            </li>
          </ul>
        </section>

        {/* Join Community */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold py-4">
            Join Our Growing Community
          </h2>
          <p className="dark:text-white text-justify">
            Whether you&apos;re looking to declutter your home, start a side
            hustle, or find that special item, SwiftCart provides the tools and
            audience to make it happen.
          </p>
          <p className="dark:text-white mt-4">
            Start your commerce journey today!{' '}
            <Link
              href="/products"
              className="text-blue-500 font-semibold hover:underline"
            >
              Explore products
            </Link>{' '}
            or{' '}
            <Link
              href="/create-shop"
              className="text-blue-500 font-semibold hover:underline"
            >
              start selling
            </Link>{' '}
            in minutes.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
