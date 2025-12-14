import PostCard from "./PostCard";
// import type { RecentPostsProps } from "@/types/types";
// import Loading from "./Loading";
import type { Prisma } from "@/prisma/generated/client";

interface RecentPostsProps {
  publishedPosts: Prisma.PostGetPayload<{
    include: {
      author: true;
      comments: true;
      likes: true;
      categories: true;
      savedBy: true;
    };
  }>[];
}

export default function RecentPosts({ publishedPosts }: RecentPostsProps) {
  return (
    <section className="mx-5 md:m-0">
      <h2 className="text-xl font-poppins text-center">Recent Posts</h2>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {publishedPosts.length > 0 ? (
          publishedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </section>
  );
}
