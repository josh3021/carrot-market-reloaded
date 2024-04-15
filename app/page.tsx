export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2.5">
        <input
          type="text"
          className="w-full rounded-full py-2.5 bg-gray-200 px-4 outline-none ring ring-transparent focus:ring-orange-500 focus:ring-offset-2 transition-shadow duration-150 placeholder:drop-shadow-sm"
          placeholder="Search here..."
        />
        <button className="bg-black bg-opacity-50 focus:bg-opacity-100 text-white font-medium py-2 rounded-full active:scale-95 focus:scale-95 outline-none transition-transform">
          Search
        </button>
      </div>
    </main>
  );
}
