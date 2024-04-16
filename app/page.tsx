export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-2.5 md:flex-row *:outline-none has-[:invalid]:ring-red-100 has-[:invalid]:ring-offset-2 ring ring-transparent">
        <input
          type="email"
          required
          className="w-full rounded-full py-2.5 bg-gray-200 px-4 ring ring-transparent focus:ring-green-500 focus:ring-offset-2 transition-shadow duration-150 placeholder:drop-shadow-sm invalid:focus:ring-red-500 peer"
          placeholder="이메일을 입력해주세요."
        />
        <span className="text-red-500 text-sm hidden peer-invalid:block font-semibold">
          이메일은 필수항목입니다.
        </span>
        <button className="bg-gradient-to-tr from-cyan-500 to-purple-500 bg-opacity-50 focus:bg-opacity-100 text-white font-medium py-2 rounded-full active:scale-95 focus:scale-95 transition-transform md:px-8 peer-invalid:from-red-600 peer-invalid:to-orange-400">
          Login
        </button>
      </div>
    </main>
  );
}
