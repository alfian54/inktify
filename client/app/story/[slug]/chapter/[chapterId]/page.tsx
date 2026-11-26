import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import type { Chapter, ChapterWithContent, StoryDetail } from "@/lib/types";

type Props = { params: Promise<{ slug: string; chapterId: string }> };

async function getStory(slug: string) {
  try {
    return await api<StoryDetail>(`/story/${slug}`);
  } catch {
    notFound();
  }
}

async function getChapter(chapterId: string) {
  try {
    return await api<ChapterWithContent>(`/chapter/${chapterId}`);
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug, chapterId } = await params;
  const [story, chapter] = await Promise.all([
    getStory(slug),
    getChapter(chapterId),
  ]);
  return { title: `${chapter.title} | ${story.title}` };
}

export default async function ReaderPage({ params }: Props) {
  const { slug, chapterId } = await params;

  const [story, chapter] = await Promise.all([
    getStory(slug),
    getChapter(chapterId),
  ]);

  // the chapter must belong to this story and be public
  if (chapter.storyId !== story._id || chapter.status !== "published") {
    notFound();
  }

  const chapters = await api<Chapter[]>(`/chapter/story/${story._id}`);
  const index = chapters.findIndex((c) => c._id === chapter._id);
  if (index === -1) notFound();

  const prev = chapters[index - 1];
  const next = chapters[index + 1];

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link
        href={`/story/${slug}`}
        className="text-sm text-ink/60 hover:text-brand"
      >
        ← {story.title}
      </Link>

      <h1 className="mt-6 border-b border-line pb-4 font-serif text-3xl text-ink">
        {chapter.title}
      </h1>

      <div
        className="chapter-content mt-8 font-serif text-lg leading-8 text-ink"
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />

      <nav className="mt-12 flex items-center justify-between border-t border-line pt-6">
        {prev ? (
          <Link
            href={`/story/${slug}/chapter/${prev._id}`}
            className="rounded-lg border border-line bg-white px-4 py-2 text-sm text-ink hover:bg-sand"
          >
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/story/${slug}/chapter/${next._id}`}
            className="rounded-lg bg-brand px-4 py-2 text-sm text-white hover:opacity-90"
          >
            Next chapter →
          </Link>
        ) : (
          <Link
            href={`/story/${slug}`}
            className="rounded-lg border border-line bg-white px-4 py-2 text-sm text-ink hover:bg-sand"
          >
            Back to story
          </Link>
        )}
      </nav>
    </main>
  );
}
