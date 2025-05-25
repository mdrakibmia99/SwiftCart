"use client";
import { getAllBrands } from "@/services/Brand";
import { getAllCategories } from "@/services/Category";
import { getFlashSaleProducts } from "@/services/FlashSale";
import { getAllProducts, getTrendingProducts } from "@/services/Product";
import { useState, useEffect } from "react";

const useFetchData = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [featured, setFeatured] = useState<string[]>([]);
  const [flash, setFlash] = useState<string[]>([]);
  const [trending, setTrending] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await getAllCategories();
      const categoryNames = data.map(
        (cat: { _id: number; name: string }) => cat.name
      );
      setCategories(categoryNames);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchBrands = async () => {
    try {
      const { data } = await getAllBrands();
      const brandNames = data.map(
        (ba: { _id: number; name: string }) => ba.name
      );
      setBrands(brandNames);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setBrands([]); 
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await getAllProducts();
      const featuredProduct = data.slice(0, 8).map(
        (prod: { _id: number; name: string }) => prod.name
      );
      setFeatured(featuredProduct);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setFeatured([]); 
    }
  };

  const fetchFlashsales = async () => {
    try {
      const { data } = await getFlashSaleProducts();
      const flashes = data.map(
        (prod: { _id: number; name: string }) => prod.name
      );
      setFlash(flashes);
    } catch (error) {
      console.error( error);
      setFlash([]); 
    }
  };

 const fetchTrending = async () => {
  try {
    const data = await getTrendingProducts(8);
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received');
    }
    const trending = data.map((prod) => prod.name);
    setTrending(trending);
  } catch (error) {
    console.error(error);
    setTrending([]);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      await Promise.allSettled([
        fetchCategories(),
        fetchBrands(),
        fetchFeaturedProducts(),
        fetchFlashsales(),
        fetchTrending(),
      ]);
    };
    fetchData();
  }, []);

  return { categories, brands, featured, flash, trending };
};

export default useFetchData;