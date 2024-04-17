"use client";
import { useFormStatus } from "react-dom";

interface IButtonProps {
  text: string;
}

export default function Button({ text }: IButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-wait transition-colors"
    >
      {pending ? "로딩중..." : text}
    </button>
  );
}
