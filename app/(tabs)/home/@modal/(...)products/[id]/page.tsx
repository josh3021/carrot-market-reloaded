"use server";

import { getIsOwner, getProduct } from "@/app/products/[id]/page";
import { CloseButton } from "@/components/btn";
import { formatToWon } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Modal({ params }: { params: { id: string } }) {
  const { id: stringId } = params;

  const id = Number(stringId);
  if (isNaN(id)) return notFound();

  const product = await getProduct(id);
  if (!product) return notFound();
  const isOwner = await getIsOwner(product.user_id);

  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-neutral-800 rounded-lg bg-opacity-60 left-0 top-0">
      <CloseButton />
      <div className="max-w-screen-sm h-3/5 flex justify-center w-full bg-neutral-800 rounded-lg shadow-2xl">
        <div className="aspect-square h-full w-3/5">
          <div className="bg-neutral-900 text-neutral-200 relative flex justify-center items-center overflow-hidden h-full">
            <Image
              src={`${product.photo}/public`}
              alt={product.title}
              fill
              className="object-contain rounded overflow-hidden"
            />
          </div>
        </div>
        <div className="w-2/5 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-xl font-bold">{product.title}</h1>
          <span className="text-lg">{formatToWon(product.price)}원</span>
          <p className="mt-4 font-light text-neutral-200 text-sm">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
