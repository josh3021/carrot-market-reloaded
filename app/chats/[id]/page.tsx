import ChatMessagesList from "@/components/chat-messages-list";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id: id,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });
  if (room) {
    const session = await getSession();
    const canEnter = Boolean(room.users.find((user) => user.id === session.id));
    if (!canEnter) return null;
  }
  return room;
}

async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      room_id: chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      user_id: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

async function getUserProfile() {
  const session = await getSession();
  if (!session || !session.id) return null;
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      username: true,
      avatar: true,
    },
  });
  return user;
}
export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  if (!room) return notFound();
  const initialChatMessages = await getMessages(params.id);
  const user = await getUserProfile();
  if (!user) return notFound();
  return (
    <ChatMessagesList
      chatRoomId={params.id}
      initialChatMessages={initialChatMessages}
      userId={user.id}
      username={user.username}
      avatar={user.avatar ?? "/avatar.svg"}
    />
  );
}
