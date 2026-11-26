import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import type { StoryDetail, Chapter } from "@/lib/types";
import type { Story } from "@/lib/types";
import Link from "next/dist/client/link";

type Props = { params: Promise<{ slug: string }> };

async function getStory(slug: string) {
  try {
    return await api<StoryDetail>(`/story/${slug}`);
  } catch {
    notFound();
  }
}

const statusStyles: Record<Story["status"], string> = {
  ongoing: "bg-green-50 text-green-700",
  completed: "bg-sand text-ink/70",
  draft: "bg-sand text-ink/70",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  return { title: `${story.title} | Inktify`, description: story.description };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  const chapters = await api<Chapter[]>(`/chapter/story/${story._id}`);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center gap-2">
        {story.genre && (
          <span className="rounded bg-sand px-2 py-1 text-xs uppercase tracking-wide text-ink">
            {story.genre}
          </span>
        )}
        <span
          className={`rounded-full px-2 py-1 text-xs capitalize ${statusStyles[story.status]}`}
        >
          {story.status}
        </span>
      </div>

      <h1 className="mt-4 font-serif text-4xl text-ink">{story.title}</h1>
      <p className="mt-2 text-ink/70">by {story.authorId.username}</p>

      {story.description && (
        <p className="mt-6 max-w-2xl leading-relaxed text-ink">
          {story.description}
        </p>
      )}

      {chapters.length > 0 && (
        <Link
          href={`/story/${slug}/chapter/${chapters[0]._id}`}
          className="mt-6 inline-block rounded-lg bg-brand px-5 py-2 text-white hover:opacity-90"
        >
          Start reading
        </Link>
      )}

      <h2 className="mt-12 border-b border-line pb-2 font-serif text-2xl text-ink">
        Chapters
      </h2>
      {chapters.length === 0 ? (
        <p className="mt-4 text-ink/60">No chapters published yet.</p>
      ) : (
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter._id}>
              <Link
                href={`/story/${slug}/chapter/${chapter._id}`}
                className="flex items-center justify-between border-b border-line py-3 hover:bg-sand/60"
              >
                <span className="text-ink">{chapter.title}</span>
                {chapter.publishedAt && (
                  <span className="text-sm text-ink/60">
                    {formatDate(chapter.publishedAt)}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
