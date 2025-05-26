"use client";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/types";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";

const ProductDetails = ({
  product,
  data,
}: {
  product: IProduct;
  data: IProduct[];
}) => {
  const dispatch = useAppDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Get similar products from the same category
  const similarProducts = data
    .filter(
      (item) =>
        item.category?._id === product?.category?._id &&
        item._id !== product._id
    )
    .slice(0, 4); // Limit to 4 similar products

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

  const handleAddProduct = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  return (
    <div className="space-y-8">
      {/* Main Product Section */}
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
                    {Math.round(
                      (1 - product?.offerPrice / product?.price) * 100
                    )}
                    % OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${product?.price}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  disabled={product?.stock === 0}
                  onClick={() => handleAddProduct(product)}
                  size="lg"
                  className="w-full bg-primary text-secondary hover:bg-primary/90"
                >
                  Add to Cart
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similarProducts.map((similarProduct) => (
              <Link
                key={similarProduct._id}
                href={`/products/${similarProduct._id}`}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="border rounded-lg p-3 hover:border-primary transition-all"
                >
                  <div className="relative aspect-square mb-3">
                    <Image
                      src={similarProduct.imageUrls[0]}
                      alt={similarProduct.name}
                      fill
                      className="object-contain group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">
                    {similarProduct.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">
                      {similarProduct.averageRating}
                    </span>
                  </div>
                  <p className="font-bold">
                    {similarProduct.offerPrice ? (
                      <>
                        <span className="text-primary">
                          ${similarProduct.offerPrice}
                        </span>
                        <del className="text-xs text-gray-500 ml-1">
                          ${similarProduct.price}
                        </del>
                      </>
                    ) : (
                      <span>${similarProduct.price}</span>
                    )}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetails;
