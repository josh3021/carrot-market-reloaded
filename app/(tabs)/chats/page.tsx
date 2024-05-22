"use server";

import { ChatList } from "@/components/chat-list";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function Chats() {
  const session = await getSession();
  const id = session.id;

  const me = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!me) return notFound();
  const chats = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: me.id,
        },
      },
    },
    include: {
      messages: {
        orderBy: {
          created_at: "desc",
        },
        take: 1,
      },
      users: true,
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">나의 채팅</h1>
      <div className="mt-4 flex flex-col space-y-3">
        {chats.map((chat) => (
          <ChatList key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
