'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

export const getAllShops = async () => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
      next: {
        tags: ['SHOPS'],
      },
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch shops: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (err: any) {
    console.error(err?.message);
  }
};

export const deleteShop = async (shopId: string) => {
  try {
    const token = await getValidToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/shop/${shopId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to delete shop: ${res.statusText}`);
    }

    revalidateTag('SHOPS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error('Error deleting shop:', error.message);
    throw error;
  }
};
