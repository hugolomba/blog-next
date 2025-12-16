"use client";
import { useState, useRef, useEffect } from "react";
import RichTextEditor from "../../utils/RichTextEditor";
// import { useAuth } from "../contexts/authContext";
// import placeHolder from "../assets/images/placeholder-cover.svg";
// import Loading from "./Loading";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { createPost } from "@/lib/actions/post-actions";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "@heroui/react";
import { set } from "better-auth/*";
import { on } from "events";

type PostType = {
  id: number;
  title: string;
  content: string;
  coverImage?: string;
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
  // const { user } = useAuth();
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [cover, setCover] = useState<File | string>();
  // post?.coverImage || placeHolder
  const [preview, setPreview] = useState<string | null>(
    post?.coverImage || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newPostId, setNewPostId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [postId, setPostId] = useState<number>(0);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      // setCover(post.coverImage || placeHolder);
      setPreview(post.coverImage || null);
      setNewPostId(post.id);
    }
  }, [post]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setCover(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // console.log(">>>>>>, ", process.env.RICH_TEXT_EDITOR_API_KEY);
  // const removeCover = async () => {
  //   // convert placeholder image to file
  //   const response = await fetch(placeHolder);
  //   const blob = await response.blob();
  //   const fileFromPlaceholder = new File([blob], "placeholder-cover", {
  //     type: blob.type,
  //   });
  //   setCover(fileFromPlaceholder);
  //   setPreview(null);
  // };

  const resetForm = () => {
    setTitle("");
    setContent("");
    // setCover(undefined);
    // setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    // if (!preview || cover === placeHolder) formData.append("removeImage", "true");
    // formData.append("coverImage", cover instanceof File ? cover : placeHolder);
    // if (mode === "create" && user?.id !== undefined) {
    formData.append("authorId", "test");
    // }

    try {
      setIsLoading(true);

      const newPost = await createPost(title, content, authorId);
      setPostId(newPost.id);
      console.log("New Post Created: ", newPost);

      // const url =
      //   mode === "edit" && post?.id
      //     ? `${import.meta.env.VITE_API_URL_BASE}/posts/${post.id}`
      //     : `${import.meta.env.VITE_API_URL_BASE}/posts`;
      // const method = mode === "edit" ? "PUT" : "POST";
      // const res = await fetch(url, {
      //   method,
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      //   body: formData,
      // });
      // const data = await res.json();
      // if (mode === "create" && data.id) setNewPostId(data.id);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
      resetForm();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
          {/* {preview && (
            <div className="flex flex-col gap-2">
              <img
                src={preview}
                alt="Cover Preview"
                className="w-full max-h-64 object-cover rounded"
              />
              <button
                type="button"
                onClick={removeCover}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Image
              </button>
            </div>
          )} */}
          {/* <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          /> */}
          {/* <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload File
          </button> */}
          <RichTextEditor value={content} onChange={setContent} />

          <Button
            type="submit"
            className="bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
          >
            {mode === "edit" ? "Update Post" : "Publish Post"}
          </Button>
        </form>
      ) : (
        <Modal
          isOpen={isSubmitted}
          onOpenChange={setIsSubmitted}
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
                    href={`/post/${postId}`}
                  >
                    View Post
                  </Link>
                  <Button
                    onPress={() => {
                      setIsSubmitted(false);
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
      )}
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
