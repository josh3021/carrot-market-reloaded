"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function likePost(postId: number) {
  const session = await getSession();
  if (!session.id) return;
  try {
    await db.like.create({
      data: {
        post_id: postId,
        user_id: session.id,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}

export async function dislikePost(postId: number) {
  const session = await getSession();
  if (!session.id) return;
  try {
    await db.like.delete({
      where: {
        id: {
          post_id: postId,
          user_id: session.id,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {}
}

export async function createComment(payload: string, postId: number) {
  const user = await getSession();
  if (!user.id) return;
  const newComment = await db.comment.create({
    data: {
      user_id: user.id,
      payload,
      post_id: postId,
    },
  });
  revalidateTag(`comments-${postId}`);
  return newComment;
}

export async function getComments(postId: number) {
  "use server";
  const comments = await db.comment.findMany({
    where: {
      post_id: postId,
    },
    include: {
      user: {
        select: { username: true, avatar: true },
      },
    },
  });
  return comments;
}
