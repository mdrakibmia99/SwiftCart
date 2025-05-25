"use server"

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getProfile= async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
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

export const updateProfile = async (formData: FormData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: formData,
      }
    );

    revalidateTag("USER");
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update profile"
    };
  }
};