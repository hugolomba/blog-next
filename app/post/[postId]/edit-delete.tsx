"use client";
import { deletePost } from "@/lib/actions/post-actions";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";

export default function EditDeleteButtons({ postId }: { postId: number }) {
  const handleDelete = () => {
    deletePost(postId);
  };

  return (
    <div className="flex mt-4 items-center gap-2">
      <Link
        // href={`/post/${post.id}/edit`}
        href={""}
        className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex flex-row items-center gap-1 px-2 py-1"
      >
        Edit <MdEdit />
      </Link>
      <button
        // onClick={() => setIsDialogOpen(true)}
        onClick={() => handleDelete}
        className="cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 flex flex-row items-center gap-1 px-2 py-1"
      >
        Delete <MdDelete />
      </button>
      {/* <ConfirmationDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onConfirm={handlePostDelete}
                    /> */}
    </div>
  );
}
