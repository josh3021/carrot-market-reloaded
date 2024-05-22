"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";

export async function saveMessage(chatRoomId: string, payload: string) {
  const session = await getSession();
  if (!session || !session.id) return null;
  await db.message.create({
    data: {
      payload,
      room_id: chatRoomId,
      user_id: session.id,
    },
    select: {
      id: true,
    },
  });
}
