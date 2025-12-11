import type { Prisma } from "@/prisma/generated/client";
import { FaHeart, FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import Image from "next/image";
import AuthorDetails from "@/components/AuthorDetails";

export default function Article({
  post,
}: {
  post: Prisma.PostGetPayload<{
    include: {
      author: true;
      comments: true;
      likes: true;
      categories: true;
      savedBy: true;
    };
  }>;
}) {
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
    <article className="relative p-2.5">
      <Image
        src={post.coverImage}
        alt="article cover image"
        width={800}
        height={400}
        className="w-full h-48 object-cover"
        loading="eager"
      />

      <div className="flex flex-col ">
        <div className="flex justify-between mt-4">
          <h2 className="text-3xl font-bold">{post.title}</h2>

          {/* <div className="text-2xl text-gray-600 flex items-center gap-4 cursor-pointer">
                    {handleLikeIcon()}
                    {handleBookmarkIcon()}
                    
                    </div> */}
        </div>
        <div className="text-gray-500 text-sm flex gap-2 align-center mt-1">
          {/* <img src={post.author.avatarImage} alt={post.author.name} className="inline-block w-4.5 h-4.5 rounded-full" /> */}

          {/* <span className="font-bold">
            by{" "}
            {post.author.name === user?.name
              ? "You"
              : `${post.author.name} ${post.author.surname}`}{" "}
          </span> */}
          {/* {post.author.id === user?.id ? (<span>Editar</span> "Apagar")} */}
          <span className="text-gray-500">{timeAgo(post.createdAt)}</span>
        </div>
      </div>

      <div
        className="prose prose-base max-w-none mt-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <AuthorDetails author={post.author} />
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
