"use client";

import { dislikePost, likePost } from "@/app/posts/[id]/actions";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface ILikeButtonProps {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

export function LikeButton({ postId, isLiked, likeCount }: ILikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState, _) => {
      return {
        isLiked: !prevState.isLiked,
        likeCount: prevState.isLiked
          ? prevState.likeCount - 1
          : prevState.likeCount + 1,
      };
    }
  );

  async function onClick() {
    reducerFn(undefined);
    if (state.isLiked) await dislikePost(postId);
    else await likePost(postId);
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 transition-colors ${
        state.isLiked
          ? "bg-orange-500 border-orange-500 hover:bg-neutral-700 active:bg-neutral-600 text-white"
          : "hover:bg-orange-500 active:bg-orange-400 hover:text-white"
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-5" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      <span>{state.likeCount}</span>
    </button>
  );
}
