"use client";
import { useState, useEffect } from "react";
import RichTextEditor from "../../utils/RichTextEditor";

import Link from "next/link";
import { createPost, updatePost } from "@/lib/actions/post-actions";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "@heroui/react";
import { ImageUploader } from "@/components/image-uploader";
import { CldImage } from "next-cloudinary";

type PostType = {
  id: number;
  title: string;
  content: string;
  coverImage?: string | null;
};

type PostFormProps = {
  post?: PostType;
  mode?: "create" | "edit";
  authorId: string;
};

export default function PostForm({
  post,
  mode = "create",
  authorId,
}: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const currentPostId = post?.id;
  const [newPostId, setNewPostId] = useState<number | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImageUrl(post.coverImage || "");
      // setNewPostId(post.id);
    }
  }, [post]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsModalOpen(true);

      if (mode === "edit" && currentPostId) {
        await updatePost({
          id: currentPostId,
          title,
          content,
          coverImage: imageUrl,
        });
      } else {
        const newPost = await createPost(title, content, imageUrl, authorId);
        setNewPostId(newPost.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (mode === "create") resetForm();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!isModalOpen && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {imageUrl && (
            <div className="relative w-full max-w-4xl aspect-2/1 overflow-hidden rounded-lg flex justify-center">
              <CldImage
                src={imageUrl}
                alt="Preview"
                width={600}
                height={400}
                className="object-contain h-full"
              />
            </div>
          )}

          <ImageUploader onUploadSuccess={setImageUrl} />

          <div className="w-full">
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <Button
            type="submit"
            className="bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
          >
            {mode === "edit" ? "Update Post" : "Publish Post"}
          </Button>
        </form>
      )}

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        className="p-4 rounded shadow-md flex flex-col items-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold">
                  {mode === "edit"
                    ? "Post Updated Successfully!"
                    : "Post Created Successfully!"}
                </h2>
              </ModalHeader>
              <ModalBody>
                <p className="text-lg mb-4">
                  {mode === "edit"
                    ? "Your post has been updated."
                    : "Your post has been published."}
                </p>
              </ModalBody>
              <ModalFooter className="flex flex-col items-center">
                <Link
                  className="py-2 px-4 bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
                  href={`/post/${mode === "edit" ? currentPostId : newPostId}`}
                >
                  View Post
                </Link>
                <Button
                  onPress={() => {
                    setIsModalOpen(false);
                    if (mode === "create") resetForm();
                  }}
                  className="bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
                >
                  Create a New Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

// function PostCreated({
//   setPosted,
//   newPostId,
//   mode = "create",
//   isSubmitted,
// }: {
//   setPosted: (value: boolean) => void;
//   newPostId?: number | null;
//   mode?: "create" | "edit";
//   isSubmitted: boolean;
// }) {
//   return (
//     <Modal
//       isOpen={isSubmitted}
//       onOpenChange={setIsSubmitted}
//       className="bg-white p-4 rounded shadow-md flex flex-col items-center"
//     >
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">
//               Modal Title
//             </ModalHeader>
//             <ModalBody>
//               <h2 className="text-2xl font-semibold">
//                 {mode === "edit"
//                   ? "Post Updated Successfully!"
//                   : "Post Created Successfully!"}
//               </h2>
//               <p className="text-lg mb-4">
//                 {mode === "edit"
//                   ? "Your post has been updated."
//                   : "Your post has been published."}
//               </p>
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 color="danger"
//                 variant="light"
//                 onPress={() => setIsSubmitted(false)}
//               >
//                 Close
//               </Button>
//               <Button color="primary" onPress={onClose}>
//                 Action
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>

//       {/* <ModalContent>
//         <h2 className="text-2xl font-semibold">
//           {mode === "edit"
//             ? "Post Updated Successfully!"
//             : "Post Created Successfully!"}
//         </h2>
//         <p className="text-lg">
//           {mode === "edit"
//             ? "Your post has been updated."
//             : "Your post has been published."}
//         </p>
//         {newPostId ? (
//           <Link
//             href={`/post/${newPostId}`}
//             className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             View Post
//           </Link>
//         ) : (
//           <button
//             disabled
//             className="mt-4 bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed"
//           >
//             Loading Post...
//           </button>
//         )}
//         <button
//           onClick={() => setPosted(false)}
//           className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
//         >
//           {mode === "edit" ? "Edit Again" : "Create Another Post"}
//         </button>
//         <Link
//           href="/dashboard"
//           className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
//         >
//           Go to Dashboard
//         </Link>
//       </ModalContent> */}
//     </Modal>
//   );
// }
