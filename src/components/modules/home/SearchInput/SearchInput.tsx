"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/types";
import { getAllProducts } from "@/services/Product";
import { Badge } from "@/components/ui/badge";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const query = {searchTerm : searchQuery}
    const searchProperty = async () => {
      const { data: products } = await getAllProducts(undefined,undefined,query);
      setProducts(products);
    };
    searchProperty();
  }, [searchQuery]);

  return (
    <div className="relative px-4  md:px-0 max-w-2xl mx-auto">
      <form role="search" className="w-full">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search house"
          className="rounded-full p-6 outline-0 bg-secondary placeholder:text-primary focus:outline-0 focus-within:outline-none"
        />
      </form>

      {searchQuery && (
        <div className="absolute top-full left-0 right-0 px-4 md:px-0 mt-2 bg-background rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {products?.length > 0 ? (
            products?.map((product: IProduct) => (
              <Link href={`/products/${product?._id}`} key={product._id}>
                <div className="flex items-center gap-5 p-2 hover:bg-accent transition-colors">
                  {/* Image Container */}
                  <div className="w-28 h-20 flex-shrink-0 relative border-2 rounded-lg overflow-hidden">
                    <Image
                      src={product.imageUrls[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>

                  {/* Card Content */}
                  <Card className="flex-1 hover:bg-transparent p-3">
                    <h3 className="font-semibold ">{product.name}</h3>
                    <Badge>
                      {" "}
                      <small>${product.price}</small>
                    </Badge>
                  </Card>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-2 text-center text-muted-foreground">
              No products found for {searchQuery}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
