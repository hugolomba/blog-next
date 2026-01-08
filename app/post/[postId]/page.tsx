import Article from "@/components/Article";
import { getPostById } from "@/lib/api";
import { SideBar } from "@/components/SideBar";

export default async function PostDetailPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;
  const post = await getPostById(postId);

  return (
    <div className="mt-5 lg:mt-10 lg:mx-4 xs:mx-5 md:grid md:grid-cols-4 gap-4">
      <Article post={post} />
      <SideBar authorId={post.author.id} />
    </div>
  );
}
