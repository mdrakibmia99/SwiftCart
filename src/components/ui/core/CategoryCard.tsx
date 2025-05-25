"use client"
import { ICategory } from "@/types";
import Image from "next/image";
import cartIcon from "@/assets/images/cart-icon.png";
import { motion } from "framer-motion";


const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    
      <motion.div
        whileHover={{ 
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center p-6 border border-gray-100"
      >
        {/* Image Container with Shine Effect */}
        <div className="relative w-20 h-20 mb-4 group-hover:scale-110 transition-transform duration-300">
          <Image
            src={category?.icon || cartIcon}
            width={80}
            height={80}
            alt={category?.name || "Category icon"}
            className="w-full h-full object-contain"
          />
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45 -translate-x-full group-hover:translate-x-full" />
        </div>


        <h3 className="text-lg font-semibold text-gray-800 relative inline-block">
          {category?.name}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </h3>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMCAwTDIwIDIwWiIgc3Ryb2tlPSIjZWVlIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]" />
        </div>
      </motion.div>
    
  );
};

export default CategoryCard;