import type { Prisma } from "@/prisma/generated/client";
// import { Link, useParams } from "react-router-dom";
// import Article from "../components/Article";
// import { useEffect, useState } from "react";
// import type { Post } from "../types/types";
// import Loading from "../components/Loading";
// import Comments from "../components/Comments";
// import NewComment from "../components/NewComment";
// import { useAuth } from "../contexts/authContext";
import Article from "@/components/Article";
// import Comments from "@/components/Comments";
// import type { Post } from "@/types/types";

import { getPostById } from "@/lib/api";
import CommentCard from "@/components/CommentCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// export default function PostDetailPage( searchParams: { [key: string]: string } ) {

//     const { id } = useParams();
//     const [post, setPost] = useState<Post | null>(null);
//     const [comments, setComments] = useState([]);
//     const { user} = useAuth();

//         const handleUpdateComments = async (postId: number) => {
//         const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${postId}/comments`);
//             const newComments = await response.json();
//             setComments(newComments);
//     };

//     useEffect(() => {

//         const fetchPost = async () => {
//             try {
//                 const response = await fetch(`${import.meta.env.VITE_API_URL_BASE}/posts/${id}`, {
//                 headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//             });

//             const data = await response.json();
//             setPost(data);
//             setComments(data.comments || []);

//             } catch (error) {
//                 console.error("Error fetching post:", error);
//             }
//         };
//         fetchPost();
//     }, []);

//     const loginToComment = () => {
//        return(
//         <div className="flex flex-col text-center p-4  bg-gray-50 space-y-2 rounded-2xl m-2">
//         <h5 className="text-xl">Please log in or register to comment.</h5>
//         <Link to="/login" className="px-1.5 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-4xl shadow">Login</Link>
//         <Link to="/register" className=" px-1.5 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-4xl shadow">Register</Link>
//        </div>
//        );
//     };

//   return (
//     <div className="mt-2">
//        {post ? (
//   <>
//       <Article post={post} />
//     <Comments comments={comments} handleUpdateComments={handleUpdateComments} />
//     {user !== null
//       ? <NewComment postId={post.id} userId={user.id} handleUpdateComments={handleUpdateComments} />
//       : loginToComment()
//     }
//   </>
// ) : (
//   <Loading />
// )}
//     </div>
//   );

export default async function PostDetailPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;
  const post = await getPostById(postId);
  console.log("Post fetched for PostDetailPage:", post);

  // session to use in CommentCard to check comment author and give options to delete if author is the same as logged in user

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="mt-5 lg:mt-10 lg:mx-40 xs:mx-5 flex flex-col justify-center">
      <Article post={post} />
      {/* <Comments comments={post.comments} /> */}
      <div className="mt-8 p-4">
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
    </div>
  );
}
