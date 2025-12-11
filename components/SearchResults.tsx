import PostCard from "@/components/PostCard";
import type { Prisma } from "@/prisma/generated/client";

// import { SearchContext } from "../contexts/SearchContext";
// import { useContext, useState } from "react";
// import SearchUserResultCard from "@/components/SearchUserResultCard";
// import Loading from "./Loading";

export default function SearchResults({
  searchResults,
}: {
  searchResults:
    | Prisma.PostGetPayload<{
        include: {
          author: true;
          comments: true;
          likes: true;
          categories: true;
          savedBy: true;
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
