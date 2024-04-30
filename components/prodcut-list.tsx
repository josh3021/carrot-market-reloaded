"use client";

import { getMoreProducts } from "@/app/(tabs)/products/actions";
import { InitialProducts } from "@/app/(tabs)/products/page";
import { useEffect, useRef, useState } from "react";
import ListProduct from "./list-product";

interface IProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: IProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(pages);
          if (newProducts.length !== 0) {
            setProducts((prev) => [...prev, ...newProducts]);
            setPages((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      { threshold: 0.5 }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [pages]);
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct {...product} key={product.id} />
      ))}
      <span
        ref={trigger}
        style={{ marginTop: `${pages + 1 * 300}vh` }}
        className="bg-green-500 mb-96 rounded-lg mx-auto px-3 py-1 disabled:bg-gray-300"
      >
        {isLoading ? "로딩중" : "더 불러오기"}
      </span>
    </div>
  );
}
