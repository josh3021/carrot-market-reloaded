"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <main className="h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col space-y-2">
        {["Nico", "Me", "You", "Yourself"].map((name, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-1 ${
              isLoading && "*:animate-pulse"
            }`}
          >
            <div className="size-10 rounded-full bg-sky-400" />
            {isLoading ? (
              <>
                <div className="w-40 h-4 bg-gray-300 rounded-full" />
                <div className="w-20 h-4 bg-gray-300 rounded-full" />
              </>
            ) : (
              <>
                <span className="text-lg font-medium">{name}</span>
                <div className="bg-red-500 size-6 flex items-center justify-center text-white rounded-full relative">
                  <div className="bg-red-500 size-6 rounded-full animate-ping absolute" />
                  <span className="z-10">{index}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
