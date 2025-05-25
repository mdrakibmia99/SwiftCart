'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

export const getProfile = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['USERS'],
      },
    });
    
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProfile = async (formData: FormData) => {
  const token = await getValidToken();
  console.log({ token });
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
        body: formData,
      }
    );

    revalidateTag('USERS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
