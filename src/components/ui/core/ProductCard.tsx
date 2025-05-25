"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddProduct = (product: IProduct) => {
    dispatch(addProduct(product));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full w-full"
    >
      <Card
        className="p-3 sm:p-4 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/30 border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <CardHeader className="relative p-0 aspect-square overflow-hidden rounded-lg">
          <Link href={`/products/${product?._id}`} passHref>
            <Image
              src={
                product?.imageUrls[0] ||
                "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
              }
              width={500}
              height={500}
              alt={product?.name}
              className="object-cover w-full h-full transition-transform duration-500 hover:opacity-90"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              priority
            />
          </Link>

          {/* Badges */}
          {product?.stock === 0 && (
            <div className="absolute left-2 top-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
              Out of Stock
            </div>
          )}

          {product?.offerPrice && (
            <div className="absolute right-2 top-2 bg-green-500 text-white px-2 py-1 text-xs rounded-full">
              {Math.round((1 - product.offerPrice / product.price) * 100)}% OFF
            </div>
          )}
        </CardHeader>

        {/* Product Info */}
        <CardContent className="p-0 mt-3 sm:mt-4 flex-1 space-y-2">
          <Link href={`/products/${product?._id}`} passHref>
            <CardTitle className="font-semibold text-base sm:text-lg hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
              {product?.name}
            </CardTitle>
          </Link>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            <span className="text-sm font-medium text-gray-700">
              {product?.averageRating}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-1">
            <div className="text-left">
              {product?.offerPrice ? (
                <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-lg sm:text-xl text-primary">
                    ${product?.offerPrice.toFixed(2)}
                  </span>
                  <del className="text-sm text-gray-500">
                    ${product?.price.toFixed(2)}
                  </del>
                </div>
              ) : (
                <span className="font-bold text-lg sm:text-xl">
                  ${product?.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="p-0 mt-3 sm:mt-4">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 w-full">
              <Link
                href={`/products/${product?._id}`}
                passHref
                className="flex-1"
              >
                <Button
                  size="sm"
                  className="w-full bg-primary text-secondary hover:bg-secondary/90 hover:text-primary"
                >
                  Details
                </Button>
              </Link>

              <Button
                disabled={product?.stock === 0}
                size="sm"
                className="flex-1 bg-secondary hover:bg-primary/90 hover:text-secondary text-primary"
                onClick={() => handleAddProduct(product)}
              >
                <ShoppingCart className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add to Cart</span>
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className={`w-full ${
                isWishlisted
                  ? "text-red-500 border-red-500"
                  : "bg-secondary hover:bg-primary/90 hover:text-secondary text-primary"
              }`}
              onClick={toggleWishlist}
            >
              <Heart
                className="h-4 w-4 mr-2"
                fill={isWishlisted ? "currentColor" : "none"}
              />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
