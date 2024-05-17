"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";

interface IAddCommentProps {
  postId: number;
  handleSubmit: (payload: string, postId: number) => Promise<void>;
  me: { id: number; avatar: string | null; username: string } | null;
}

export function AddComment({ postId, handleSubmit, me }: IAddCommentProps) {
  const [loading, setLoading] = useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = formData.get("payload") as string;
    await handleSubmit(payload, postId);
    setLoading(false);
  }
  return (
    <div className="w-full h-16 absolute bottom-0 px-5 border-t border-neutral-600">
      <form
        className="flex space-x-4 justify-around items-center size-full"
        onSubmit={onSubmit}
      >
        <input
          placeholder={
            me
              ? "여기에 댓글을 달아보세요!"
              : "댓글을 달기 위해서는 로그인을 해주세요!"
          }
          className="w-11/12 h-12 bg-transparent rounded-full focus:outline-none outline-offset-2"
          name="payload"
          disabled={!me}
        />
        {me && (
          <button
            className="text-orange-500 hover:text-orange-400 active:text-orange-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:animate-pulse"
            type="submit"
            disabled={loading}
          >
            <PaperAirplaneIcon className="size-8" />
          </button>
        )}
      </form>
    </div>
  );
}
