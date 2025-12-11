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
      <ul className="mt-4 md:flex md:flex-wrap md:gap-1 md:justify-around">
        {publishedPosts.length > 0 ? (
          publishedPosts.map((post) => (
            // <p>{post.title}</p>
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          // <Loading /> <p>No posts available.</p>
          <p>No posts available.</p>
        )}
      </ul>
    </section>
  );
}
