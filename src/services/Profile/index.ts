"use server"

import { getValidToken } from "@/lib/verifyToken";

export const getProfile= async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`https://swiftcart-server-silk.vercel.app/api/v1/user/me`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["USER"],
      },
    });
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};