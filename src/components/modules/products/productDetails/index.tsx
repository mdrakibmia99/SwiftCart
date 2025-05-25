'use client'
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product?.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product?.imageUrls.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-lg bg-white shadow-lg"
    >
      {/* Product Images */}
      <div className="relative">
        <div
          className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={product?.imageUrls[currentImageIndex]}
                alt={product?.name}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {isHovering && product?.imageUrls?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Gallery */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {product?.imageUrls?.map((image, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentImageIndex(idx)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                currentImageIndex === idx
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900"
        >
          {product?.name}
        </motion.h1>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center bg-secondary rounded-full px-3 py-1"
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">
              {product?.averageRating} ({product?.ratingCount || 0} reviews)
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-500"
          >
            Brand: {product?.brand?.name ?? "Unknown"}
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700 leading-relaxed"
        >
          {product?.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Availability:</span>
            <span
              className={`text-sm font-medium ${
                product?.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product?.stock > 0
                ? `In Stock (${product?.stock})`
                : "Out of Stock"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="text-sm font-medium text-primary">
              {product?.category?.name}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t border-gray-200"
        >
          <div className="flex items-end gap-3 mb-6">
            {product?.offerPrice ? (
              <>
                <span className="text-3xl font-bold text-gray-900">
                  ${product?.offerPrice}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product?.price}
                </span>
                <span className="ml-2 bg-red-100 text-red-600 text-sm font-medium px-2 py-0.5 rounded">
                  {Math.round((1 - product?.offerPrice / product?.price) * 100)}%
                  OFF
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                ${product?.price}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                size="lg"
                className="w-full bg-primary text-secondary hover:bg-primary/90"
              >
                Add to Cart
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button size="lg" variant="outline" className="w-full bg-secondary text-primary hover:bg-primary/90 hover:text-secondary"> 
                Buy Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
