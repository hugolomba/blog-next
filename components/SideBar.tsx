import { getPostsByAuthorId, searchPosts } from "@/lib/api";
import PostCard from "./PostCard";
import AuthorDetails from "./AuthorDetails";

export async function SideBar({ authorId }: { authorId: string }) {
  const postsByAuthor = await getPostsByAuthorId(authorId);

  console.log("Posts by author in SideBar:", postsByAuthor);

  return (
    <div className="p-4 border-l border-gray-200 flex flex-col mt-6">
      <AuthorDetails author={postsByAuthor[0]?.author} />
      <h2 className="text-lg text-center mt-4 font-semibold mb-4 uppercase">
        More from {postsByAuthor[0]?.author.name}
      </h2>
      <div className="flex md:flex-col gap-4">
        {postsByAuthor?.slice(0, 5).map((post) => (
          <PostCard key={post.id} post={post} cardType="sidebar" />
        ))}
      </div>
    </div>
  );
}
