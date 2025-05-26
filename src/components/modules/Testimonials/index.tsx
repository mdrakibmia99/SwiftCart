import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import SCContainer from '@/components/ui/core/SCContainer';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Seller',
    feedback:
      'SwiftCart helped me grow my online store 5x in just six months! The seller tools are incredible.',
    rating: 4.9,
    image: '/users/sarah.png',
  },
  {
    name: 'Michael Chen',
    role: 'Buyer',
    feedback:
      'Found exactly what I needed at great prices. The buyer protection gives me total peace of mind.',
    rating: 5.0,
    image: '/users/michael.png',
  },
  {
    name: 'Emma Wilson',
    role: 'Seller',
    feedback:
      'Reached $50k in sales faster than I ever imagined. The analytics dashboard is a game-changer!',
    rating: 4.8,
    image: '/users/emma.png',
  },
  {
    name: 'David Martinez',
    role: 'Buyer',
    feedback:
      'Fast shipping and authentic products every time. My go-to marketplace for unique finds!',
    rating: 4.7,
    image: '/users/david.png',
  },
  {
    name: 'Priya Patel',
    role: 'Seller',
    feedback:
      'The seller community support helped me optimize my listings and boost conversions.',
    rating: 4.9,
    image: '/users/priya.png',
  },
  {
    name: 'James Smith',
    role: 'Buyer',
    feedback:
      "Best customer service I've experienced. Resolved an issue with my order in minutes!",
    rating: 5.0,
    image: '/users/james.png',
  },
  {
    name: 'Maria Garcia',
    role: 'Seller',
    feedback:
      'From 10 to 500+ monthly sales - SwiftCart made scaling my business effortless.',
    rating: 4.6,
    image: '/users/maria.png',
  },
  {
    name: 'Li Wei',
    role: 'Buyer',
    feedback:
      "Love the verified reviews system. Always know exactly what I'm getting.",
    rating: 4.8,
    image: '/users/li.png',
  },
];

export default function Testimonials() {
  return (
    <div className="my-5 md:my-20">
      <SCContainer>
        <section className="py-14 bg-blue-50 rounded-md">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-6 text-gray-900">
              Success Stories
            </h2>
            <p className="text-gray-600 mb-8">
              Hear from our thriving community of sellers and satisfied buyers
            </p>

            <Marquee autoFill pauseOnClick pauseOnHover speed={50}>
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-2 md:p-6 mx-3 md:mx-6 bg-white shadow-md rounded-lg"
                >
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="w-12 md:w-16 h-12 md:h-16 mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        // placeholder="blur"
                        // blurDataURL={userImage}
                        priority
                        className="rounded-full"
                      />
                    </Avatar>
                    <h3 className="text-base md:text-xl font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-gray-700 text-base md:text-lg font-medium my-2 md:my-4 text-center">
                      &quot;{testimonial.feedback}&quot;
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(testimonial?.rating)
                              ? 'bg-amber-500 p-1 mx-1 rounded-sm fill-white text-transparent'
                              : 'bg-gray-300 p-1 mx-1 rounded-sm fill-white text-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Marquee>
          </div>
        </section>
      </SCContainer>
    </div>
  );
}
