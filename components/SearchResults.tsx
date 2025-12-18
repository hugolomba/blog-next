import PostCard from "@/components/PostCard";
import type { Prisma } from "@/prisma/generated/client";

export default function SearchResults({
  searchResults,
}: {
  searchResults:
    | Prisma.PostGetPayload<{
        include: {
          author: true;
          comments: {
            include: {
              author: true;
            };
          };
        };
      }>[]
    | null;
}) {
  // const { setSearchResults, searchAuthorsResults, isLoadingSearch } = useContext(SearchContext);
  // const [searchType, setSearchType] = useState<"articles" | "authors">("articles");

  return (
    <section className="mx-5 flex flex-col">
      <h2 className="text-xl font-poppins">Search Results</h2>

      <ul className="mt-4 lg:flex lg:flex-wrap lg:gap-4">
        {searchResults?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
