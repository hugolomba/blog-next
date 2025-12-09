import PostCard from "./PostCard";
import type { RecentPostsProps } from "@/app/types/types";
// import Loading from "./Loading";

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
