import { CommentList } from "@/components/comment-list";
import { LikeButton } from "@/components/like-button";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getComments } from "./actions";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: { views: { increment: 1 } },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            Comments: true,
            Likes: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ["post-detail"], {});

async function getLikeStatus(postId: number, userId: number) {
  const like = await db.like.findUnique({
    where: {
      id: {
        post_id: postId,
        user_id: userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      post_id: postId,
    },
  });
  return {
    likeCount,
    isLiked: !!like,
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  if (!session.id) return { likeCount: 0, isLiked: false };
  const cachedOperation = nextCache(getLikeStatus, ["product-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, session.id);
}

function getCachedComments(postId: number) {
  const cachedComments = nextCache(getComments, ["comments"], {
    tags: [`comments-${postId}`],
  });
  return cachedComments(postId);
}

async function getMe() {
  const mySession = await getSession();
  const me = mySession.id
    ? await db.user.findUnique({
        where: {
          id: mySession.id,
        },
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      })
    : null;
  return me;
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const post = await getCachedPost(id);
  if (!post) return notFound();

  const { isLiked, likeCount } = await getCachedLikeStatus(post.id);
  const allComments = await getCachedComments(post.id);
  const me = await getMe();
  return (
    <div className=" text-white relative min-h-screen">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Image
            width={28}
            height={28}
            className="size-7 rounded-full"
            src={post.user.avatar ?? "/avatar.svg"}
            alt={post.user.username}
          />
          <div>
            <span className="text-sm font-semibold">{post.user.username}</span>
            <div className="text-xs">
              <span>{formatToTimeAgo(post.created_at.toString())}</span>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="mb-5">{post.description}</p>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <EyeIcon className="size-5" />
            <span>조회 {post.views}</span>
          </div>
          <LikeButton
            postId={post.id}
            isLiked={isLiked}
            likeCount={likeCount}
          />
        </div>
      </div>
      <CommentList postId={post.id} allComments={allComments} me={me} />
    </div>
  );
}
