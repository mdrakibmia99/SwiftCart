'use client';

import { getAllBrands } from '@/services/Brand';
import { getAllCategories } from '@/services/Category';
import { getFlashSaleProducts } from '@/services/FlashSale';
import { getAllProducts, getTrendingProducts } from '@/services/Product';
import { useState, useEffect } from 'react';

interface SubcategoryItem {
  id: string;
  name: string;
}

export const useFetchData = () => {
  const [categories, setCategories] = useState<SubcategoryItem[]>([]);
  const [brands, setBrands] = useState<SubcategoryItem[]>([]);
  const [featured, setFeatured] = useState<SubcategoryItem[]>([]);
  const [flash, setFlash] = useState<SubcategoryItem[]>([]);
  const [trending, setTrending] = useState<SubcategoryItem[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await getAllCategories();
      const categoryItems: SubcategoryItem[] = data.map(
        (cat: { _id: string; name: string }) => ({
          name: cat.name,
          id: cat._id,
        })
      );
      setCategories(categoryItems);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchBrands = async () => {
    try {
      const { data } = await getAllBrands();
      const brandItems: SubcategoryItem[] = data.map(
        (ba: { _id: string; name: string }) => ({
          name: ba.name,
          id: ba._id,
        })
      );
      setBrands(brandItems);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrands([]);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await getAllProducts();
      const featuredProduct: SubcategoryItem[] = data
        .slice(0, 8)
        .map((prod: { _id: string; name: string }) => ({
          name: prod.name,
          id: prod._id,
        }));
      setFeatured(featuredProduct);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeatured([]);
    }
  };

  const fetchFlashsales = async () => {
    try {
      const { data } = await getFlashSaleProducts();
      const flashes: SubcategoryItem[] = data.map(
        (prod: { _id: string; name: string }) => ({
          name: prod.name,
          id: prod._id,
        })
      );
      setFlash(flashes);
    } catch (error) {
      console.error(error);
      setFlash([]);
    }
  };

  const fetchTrending = async () => {
    try {
      const { data: products } = await getTrendingProducts(8);
      // if (!Array.isArray(data)) throw new Error('Invalid data format');

      const trendingItems: SubcategoryItem[] = products.map(
        (prod: { _id: string; name: string }) => ({
          name: prod.name,
          id: prod._id,
        })
      );
      setTrending(trendingItems);
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
