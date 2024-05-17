"use client";

import { createComment } from "@/app/posts/[id]/actions";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { useOptimistic, useRef } from "react";
import { AddComment } from "./add-comment";

interface ICommentListProps {
  allComments: {
    user: {
      avatar: string | null;
      username: string;
    };
    id: number;
    payload: string;
    user_id: number;
    post_id: number;
    created_at: Date;
    updated_at: Date;
  }[];
  postId: number;
  me: { avatar: string | null; username: string; id: number } | null;
}

export function CommentList({ allComments, postId, me }: ICommentListProps) {
  const commentEndRef = useRef<HTMLDivElement>(null);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    allComments,
    (state: any[], newComment: any) => {
      return [...state, newComment];
    }
  );
  const handleSubmit = async (payload: string, postId: number) => {
    if (!me) return;
    addOptimisticComment({
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      id: optimisticComments.length + 1,
      payload,
      post_id: postId,
      user: {
        username: me.username,
        avatar: me.avatar,
      },
    });
    if (commentEndRef.current)
      commentEndRef.current.scrollIntoView({ behavior: "smooth" });
    await createComment(payload, postId);
  };

  return (
    <div className="w-11/12 mx-auto">
      <span className="font-medium">
        Comments ({optimisticComments.length})
      </span>
      <div className="flex flex-col space-y-2 mt-4 overflow-y-auto h-96 ">
        {optimisticComments.map((comment) => (
          <div
            className="w-full relative px-4 py-2 flex space-x-4 bg-neutral-700 rounded-lg"
            key={comment.id}
          >
            <div className="size-12 rounded-full relative overflow-hidden border border-neutral-800">
              <Image
                fill
                className="size-7 object-cover"
                src={comment.user.avatar ?? "/avatar.svg"}
                alt={comment.user.username}
              />
            </div>
            <div className="w-5/6 flex flex-col items-start justify-between">
              <p className="font-light">{comment.payload}</p>
              <span className="text-xs text-gray-300">
                {formatToTimeAgo(comment.created_at)}
              </span>
            </div>
          </div>
        ))}
        <div ref={commentEndRef} className="h-0 w-full">
          End
        </div>
      </div>
      <AddComment postId={postId} handleSubmit={handleSubmit} me={me} />
    </div>
  );
}
