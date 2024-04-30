import ProductList from "@/components/prodcut-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialProducts() {
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
    // skip,
  });
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-5 text-white transition-colors hover:bg-orange-400 active:bg-orange-300"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
