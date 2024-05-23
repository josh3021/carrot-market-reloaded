import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { ArrowPathIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getStream(id: number) {
  const stream = await db.liveStream.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      stream_key: true,
      stream_id: true,
      user_id: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return stream;
}

export default async function StreamDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const stream = await getStream(id);
  if (!stream) {
    return notFound();
  }
  const session = await getSession();

  return (
    <div className="">
      <div className="relative aspect-video">
        <iframe
          src={`https://${process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN}/${stream.stream_id}/iframe`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          className="size-full rounded-md"
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">
          {stream.user.avatar !== null ? (
            <Image
              src={stream.user.avatar}
              width={40}
              height={40}
              alt={stream.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <h3>{stream.user.username}</h3>
            <span>{stream.user_id === session.id && "👑"}</span>
          </div>
          <div className="flex gap-2">
            <button>
              <ArrowPathIcon className="size-6" />
            </button>
            <button>
              <span className="font-bold bg-red-500 px-2 py-1 rounded-md">
                Delete Live
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{stream.title}</h1>
      </div>
      {stream.user_id === session.id && (
        <div className="bg-yellow-200 text-black p-5 rounded-md">
          <h1 className="font-bold">
            Hello {stream.user.username}! You are the host of this live stream!
            Here are the details:
          </h1>
          <div className="flex gap-1">
            <span className="font-semibold">Stream URL:</span>
            <span>rtmps://live.cloudflare.com:443/live/</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            <span className="font-semibold">Secret Key:</span>
            <span>{stream.stream_key}</span>
          </div>
          <span className="text-red-500 font-bold">
            Please, DO NOT reveal this informations to anyone
          </span>
        </div>
      )}
    </div>
  );
}
