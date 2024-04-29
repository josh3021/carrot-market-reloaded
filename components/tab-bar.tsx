"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  UserIcon as OutlineUserIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  UserIcon as SolidUserIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="bg-neutral-900 fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white">
      <Link href="/products" className="flex flex-col items-center gap-px">
        {pathname === "/products" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/life" className="flex flex-col items-center gap-px">
        {pathname === "/life" ? (
          <SolidNewspaperIcon className="w-7 h-7" />
        ) : (
          <OutlineNewspaperIcon className="w-7 h-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link href="/chats" className="flex flex-col items-center gap-px">
        {pathname === "/chats" ? (
          <SolidChatIcon className="w-7 h-7" />
        ) : (
          <OutlineChatIcon className="w-7 h-7" />
        )}
        <span>채팅</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        {pathname === "/live" ? (
          <SolidVideoCameraIcon className="w-7 h-7" />
        ) : (
          <OutlineVideoCameraIcon className="w-7 h-7" />
        )}
        <span>쇼핑</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>마이 드링크</span>
      </Link>
    </div>
  );
}
