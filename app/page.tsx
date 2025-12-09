import Header from "@/components/Hero";
import RecentPosts from "@/components/RecentPosts";
import Search from "@/components/Search";
import SearchResults from "@/components/SearchResults";
import { getPosts } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const baseUrl = process.env.API_URL_BASE;

  const { q: query } = await searchParams;

  console.log("Search query on home page:", query);

  let posts;

  if (query) {
    // search results
    posts = await fetch(`${baseUrl}/posts/search?q=${query}`).then((r) =>
      r.json()
    );
  } else {
    // fetch all posts
    posts = await getPosts();
  }

  return (
    <main className="container mx-auto px-4">
      <Header />
      {query ? (
        <SearchResults searchResults={posts} />
      ) : (
        <RecentPosts publishedPosts={posts} />
      )}
    </main>
  );
}
