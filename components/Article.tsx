import type { Prisma } from "@/prisma/generated/client";
import Image from "next/image";
import CommentCard from "./CommentCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NewComment from "./NewComment";
import Link from "next/link";

export default async function Article({
  post,
}: {
  post: Prisma.PostGetPayload<{
    include: { author: true; comments: { include: { author: true } } };
  }>;
}) {
  // session to use in CommentCard to check comment author and give options to delete if author is the same as logged in user

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  function timeAgo(date: Date) {
    // const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  return (
    <article
      className="relative p-2.5 flex flex-col items-center w-full max-w-8xl col-span-3
"
    >
      <div className="mb-4 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold">{post.title}</h2>
        {/* <div className="text-gray-500 text-sm flex gap-2 justify-items-start"> */}
        <span className="text-foreground/40 text-center">
          written by {post.author.name} - {timeAgo(post.createdAt)}
        </span>
        {/* </div> */}
      </div>

      <div className="relative w-full max-w-4xl aspect-2/1 overflow-hidden rounded-lg">
        <Image
          src={post.coverImage || ""}
          alt="article cover image"
          fill
          className="object-cover"
          loading="eager"
        />
      </div>

      {/* <h4 className="text-xl text-foreground font-semibold mt-2">
        Written by {post.author.name}
      </h4> */}
      {/* <AuthorDetails author={post.author} /> */}

      <div
        className="prose prose-base max-w-none mt-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="w-full mt-8 p-4">
        <h3 className="text-xl font-semibold">
          Comments ({post.comments.length})
        </h3>
        <div className="flex flex-col gap-4 mt-4">
          {post.comments
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                user={session?.user}
              />
            ))}
        </div>
      </div>

      {session?.user ? (
        <NewComment
          postId={post.id}
          userId={session.user.id}
          userImage={session.user.image}
        />
      ) : (
        <div className="w-full flex items-center flex-col text-center p-4  bg-foreground/10 space-y-2 rounded-2xl m-2">
          <h5 className="text-xl">Please log in or register to comment.</h5>
          <Link
            href="/auth"
            className="py-2 px-4 bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
          >
            Login
          </Link>
        </div>
      )}
    </article>
  );
}

// function ConfirmationDialog({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
//             <div className="bg-white rounded shadow-lg p-4 z-10">
//                 <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
//                 <p>Are you sure you want to delete this post?</p>
//                 <div className="mt-4 flex justify-end">
//                     <button onClick={onClose} className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2">
//                         Cancel
//                     </button>
//                     <button onClick={onConfirm} className="bg-red-500 text-white rounded px-4 py-2">
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
