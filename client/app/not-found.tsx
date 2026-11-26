import Link from "next/link";

export const metadata = { title: "Page not found | Inktify" };

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-widest text-ink/50">404</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-ink/70">
        This page doesn&apos;t exist, or the story may have been removed.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-brand px-5 py-2 text-white hover:opacity-90"
      >
        Back to the feed
      </Link>
    </main>
  );
}
