export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 h-44 bg-white rounded-lg shadow-xl px-8 py-auto flex flex-col justify-evenly">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-light">In transit</span>
            <h1 className="text-3xl font-bold">Coolblue</h1>
          </div>
          <div className="bg-orange-600 rounded-full w-10 h-10 flex flex-col justify-center items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-green-500 text-white px-2 py-0.5 font-light rounded-full text-sm">
            Today
          </span>
          <span className="text-gray-600">9:30-10:30</span>
        </div>
        <div className="relative">
          <div className="w-full bg-slate-200 rounded-full h-3 absolute" />
          <div className="w-3/4 bg-orange-600 rounded-full h-3 absolute" />
        </div>
        <div className="flex justify-between text-gray-400 text-xs">
          <span>Expected</span>
          <span>Sorting centre</span>
          <span>In transit</span>
          <span>Delivered</span>
        </div>
      </div>
    </main>
  );
}
