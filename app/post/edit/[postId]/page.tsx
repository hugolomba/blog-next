import PostForm from "@/app/post/new/post-form";
import { getPostById } from "@/lib/api";

export default async function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;
  const post = await getPostById(postId);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center mt-4">Edit Post</h1>
      <PostForm post={post} mode="edit" authorId={post.authorId} />
    </>
  );
}
