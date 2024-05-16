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
