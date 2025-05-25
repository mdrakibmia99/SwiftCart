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
      className="h-full"
    >
      <Card
        className="p-4 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary hover:border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="relative p-0 aspect-square overflow-hidden rounded-lg">
          <Image
            src={
              product?.imageUrls[0] ||
              "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
            }
            width={500}
            height={500}
            alt={product?.name}
            className="object-cover w-full h-full transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            priority
          />

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

        <CardContent className="p-0 mt-4 flex-1">
          <Link href={`/products/${product?._id}`} passHref>
            <CardTitle className="font-semibold text-lg hover:text-primary transition-colors">
              {product?.name.length > 30
                ? product?.name?.slice(0, 30) + "..."
                : product?.name}
            </CardTitle>
          </Link>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" fill="orange" stroke="orange" />
              <span className="text-sm font-medium text-gray-700">
                {product?.averageRating}
              </span>
            </div>

            <div className="text-right">
              {product?.offerPrice ? (
                <div className="space-y-1">
                  <span className="font-bold text-lg text-primary">
                    ${product?.offerPrice.toFixed(2)}
                  </span>
                  <del className="text-sm text-gray-500 block">
                    ${product?.price.toFixed(2)}
                  </del>
                </div>
              ) : (
                <span className="font-bold text-lg">
                  ${product?.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-0 mt-4">
          <div className="flex gap-2 items-center w-full">
            <Button
              disabled={product?.stock === 0}
              size="sm"
              className="w-full flex-1 bg-primary text-secondary hover:bg-secondary hover:text-primary hover:border-primary"
              variant="outline"
              onClick={() => handleAddProduct(product)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            <motion.div
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${isWishlisted ? "text-red-500" : ""}`}
                onClick={toggleWishlist}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
