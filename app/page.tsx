import Header from "@/components/Hero";
import RecentPosts from "@/components/RecentPosts";
import { getPosts } from "@/lib/api";

export default async function Home() {
  const posts = await getPosts();
  console.log(posts);

  return (
    <main className="container mx-auto px-4">
      <Header />
      <RecentPosts publishedPosts={posts} />
    </main>
  );
}
