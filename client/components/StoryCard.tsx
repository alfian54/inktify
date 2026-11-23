import Link from "next/link";
import type { Story } from "@/lib/types";

const statusStyles: Record<Story["status"], string> = {
  ongoing: "bg-green-50 text-green-700",
  completed: "bg-sand text-ink/70",
  draft: "bg-sand text-ink/70",
};

export default function StoryCard({ story }: { story: Story }) {
  const chapterLabel = story.chapterCount === 1 ? "Chapter" : "Chapters";

  return (
    <Link
      href={`/story/${story.slug}`}
      className="flex h-full flex-col rounded-xl border border-line bg-white p-5 transition hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        {story.genre ? (
          <span className="rounded bg-sand px-2 py-1 text-xs uppercase tracking-wide text-ink">
            {story.genre}
          </span>
        ) : (
          <span />
        )}
        <span
          className={`rounded-full px-2 py-1 text-xs capitalize ${statusStyles[story.status]}`}
        >
          {story.status}
        </span>
      </div>

      <h3 className="mt-4 flex-1 font-serif text-xl text-ink">{story.title}</h3>
      <p className="mt-3 text-sm text-ink/70">by {story.authorId.username}</p>

      <div className="border-t border-line pt-3 text-sm text-ink/60">
        {story.chapterCount} {chapterLabel}
      </div>
    </Link>
  );
}
