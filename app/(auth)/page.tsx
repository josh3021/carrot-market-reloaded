import "@/lib/db";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto *:font-medium flex flex-col items-center gap-2">
        <span className="text-9xl">🍷🥂🍾</span>
        <h1 className="text-4xl">떼루아</h1>
        <h2 className="text-2xl">AI가 분석해주는 나의 테이스팅 노트</h2>
        <h4 className="text-lg mt-8">
          &ldquo;떼루아는 건전한 음주문화를 지향합니다.&rdquo;
        </h4>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn text-lg py-1">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
