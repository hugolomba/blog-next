"use client";
import { IoIosSend } from "react-icons/io";
import Image from "next/image";
import { createComment } from "@/lib/actions/comments-actions";

export default function NewComment({
  postId,
  userId,
  userImage,
}: {
  postId: number;
  userId: string;
  userImage: string | null | undefined;
}) {
  async function handleSubmit(formData: FormData) {
    const content = formData.get("content");

    if (!content) return;

    await createComment(content.toString(), userId, postId);
  }

  return (
    <div className="w-full p-4 flex items-center rounded-2xl m-2 space-x-4">
      <Image
        src={userImage || "/default-avatar.png"}
        width={48}
        height={48}
        alt="User Avatar"
        className="w-12 h-12 object-cover rounded-full shrink-0"
      />
      <form className="flex flex-1 items-center gap-2" action={handleSubmit}>
        <textarea
          name="content"
          placeholder="Write a comment..."
          className="flex-1 p-2 border border-gray-300 rounded-md resize-none"
        />
        <button
          type="submit"
          className="bg-linear-to-r text-white from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 p-2 rounded-3xl shrink-0"
        >
          <IoIosSend />
        </button>
      </form>
    </div>
  );
}
