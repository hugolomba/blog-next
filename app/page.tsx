import Header from "@/components/Hero";
import RecentPosts from "@/components/RecentPosts";
import SearchResults from "@/components/SearchResults";
import { getPublishedPosts, searchPosts } from "@/lib/api";
// import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q } = await searchParams;
  const query = Array.isArray(q) ? q[0] : q; // take the first element if it's an array

  console.log("Search query on home page:", query);

  let posts;

  if (query) {
    // perform search with the query
    posts = await searchPosts(query);
  } else {
    // fetch all posts
    posts = await getPublishedPosts();
  }

  console.log("Posts to display on home page:", posts);

  // const session = await auth();
  const session = null;
  console.log("User session on home page:", session);

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
