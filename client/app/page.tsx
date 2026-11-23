"use client";

import { useEffect, useState } from "react";
import StoryCard from "@/components/StoryCard";
import { api } from "@/lib/api";
import type { Story } from "@/lib/types";

const GENRES = [
  { label: "All", value: "" },
  { label: "Fantasy", value: "fantasy" },
  { label: "Sci-Fi", value: "sci-fi" },
  { label: "LitRPG", value: "litrpg" },
  { label: "Romance", value: "romance" },
  { label: "Mystery", value: "mystery" },
];

export default function Home() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const makeKey = (search: string, genre: string) => `${search}|${genre}`;
  const refreshing =
    loadedKey !== null && loadedKey !== makeKey(debouncedSearch, genre);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (genre) params.set("genre", genre);
    const query = params.toString();

    api<Story[]>(`/story${query ? `?${query}` : ""}`)
      .then((data) => {
        if (cancelled) return;
        setStories(data);
        setError("");
        setLoadedKey(makeKey(debouncedSearch, genre));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, genre]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex flex-col items-center gap-4">
        <input
          type="search"
          aria-label="Search stories"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl rounded-full border border-line bg-white px-5 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <div className="flex flex-wrap justify-center gap-2">
          {GENRES.map((g) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setGenre(g.value)}
              className={`rounded-full px-4 py-1.5 text-sm ${
                genre === g.value
                  ? "bg-brand text-white"
                  : "border border-line bg-white text-ink hover:bg-sand"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading stories...</p>
      ) : error ? (
        <p className="text-red-700">{error}</p>
      ) : stories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity ${
            refreshing ? "opacity-60" : ""
          }`}
        >
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </main>
  );
}
