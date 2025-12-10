import type { Post } from "@/app/types/types";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
// import { useAuth } from "../contexts/authContext";
// import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function PostCard({ post }: { post: Post }) {
  // const { user } = useAuth();
  // const [likes] = useState(post.likes.map((like: any) => like.userId)); // Array of user IDs who liked the post
  // const [bookmarks] = useState(
  // post.savedBy.map((bookmark: any) => bookmark.userId)
  // ); // Array of user IDs who bookmarked the post

  // const handleBookmarkIcon = () => {
  //   if (user && bookmarks.includes(user.id)) {
  //     return <FaBookmark className="text-blue-500" />;
  //   } else {
  //     return <FaRegBookmark />;
  //   }
  // };

  // const handleLikeIcon = () => {
  //   if (user && likes.includes(user.id)) {
  //     return <FaHeart className="text-red-500" />;
  //   } else {
  //     return <FaRegHeart />;
  //   }
  // };

  return (
    <li className="bg-white rounded-md shadow-md p-4 mb-6 hover:shadow-lg transition w-full md:w-sm lg:w-sm xl:w-sm">
      <Link href={`/post/${post.id}`}>
        <Image
          src={post.coverImage}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-42 object-cover rounded-md"
        />

        <div className="flex justify-between items-center mt-2 mb-1 md:flex-col md:items-start">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <div className="text-gray-600 flex items-center gap-2 cursor-pointer">
            <span className="flex flex-row items-center gap-0.5">
              <FaRegComment /> {post.comments.length}
            </span>
            {/* <span className="flex flex-row items-center gap-0.5">
              {handleBookmarkIcon()} {post.savedBy.length}
            </span>
            <span className="flex flex-row items-center gap-0.5">
              {handleLikeIcon()} {post.likes.length}
            </span> */}
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex justify-between mt-2 gap-6">
          <div className="text-sm text-gray-500">
            Published on: {new Date(post.createdAt).toLocaleDateString()}
          </div>

          <div className="text-gray-500 text-sm flex gap-2 align-center">
            <span>{post.author.name}</span>
            <Image
              src={post.author.avatarImage}
              alt={post.author.name}
              width={18}
              height={18}
              className="rounded-full"
            />
          </div>
        </div>
      </Link>
    </li>
  );
}
