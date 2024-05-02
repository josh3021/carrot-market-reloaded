"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { productSchema } from "./schema";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get("photo") as File,
    title: formData.get("title") as string,
    price: Number(formData.get("price") as string),
    description: formData.get("description") as string,
  };
  const results = productSchema.safeParse(data);
  if (!results.success) {
    return results.error.flatten();
  }
  // if (!data.photo.type.startsWith("image/")) {
  //   return { error: "이미지 파일만 업로드 가능합니다." };
  // }
  // if (data.photo.size > MAX_FILE_SIZE) {
  //   return { error: "이미지 파일은 5MB 이하만 업로드 가능합니다." };
  // }
  const session = await getSession();
  console.log(results.data, session);
  if (session.id) {
    const product = await db.product.create({
      data: {
        title: results.data.title,
        description: results.data.description,
        price: results.data.price,
        photo: results.data.photo,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/products/${product.id}`);
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
