"use client";
// import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
// import { SearchContext } from "../contexts/SearchContext";

export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <form
      className="w-full md:w-1/2 mx-auto flex items-center relative mt-1.5"
      onSubmit={handleSearch}
    >
      <label htmlFor="search" className="sr-only">
        Search Articles
      </label>
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for articles or authors..."
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
