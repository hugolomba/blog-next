import PostForm from "@/app/post/new/post-form";
import { getPostById } from "@/lib/api";

export default async function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;
  const post = await getPostById(postId);

  return <PostForm post={post} mode="edit" authorId={post.authorId} />;
}
