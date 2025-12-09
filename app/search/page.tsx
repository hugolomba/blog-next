import SearchResults from "@/components/SearchResults";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { q } = await searchParams;

  console.log("Search query:", q);

  const baseUrl = process.env.API_URL_BASE;

  const posts = await fetch(`${baseUrl}/posts/search?q=${q}`).then((r) =>
    r.json()
  );
  const authors = await fetch(`${baseUrl}/users/search?q=${q}`).then((r) =>
    r.json()
  );

  console.log("Posts:", posts);
  console.log("Authors:", authors);

  return <SearchResults searchResults={posts} />;
}
