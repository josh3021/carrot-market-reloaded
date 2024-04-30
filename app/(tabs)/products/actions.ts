"use server";

import db from "@/lib/db";

export async function getMoreProducts(page: number = 0) {
  return db.product.findMany({
    select: {
      title: true,
      price: true,
      createdAt: true,
      photo: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
    skip: page * 1,
  });
}
