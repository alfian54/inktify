"use client";

import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif text-2xl font-bold text-brand">
            Inktify
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-ink hover:text-brand"
          >
            Feed
          </Link>
          <Link
            href="/write"
            className="text-sm font-medium text-ink hover:text-brand"
          >
            Write
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {loading ? null : user ? (
            <>
              <span className="text-ink">{user.username}</span>
              <button
                onClick={logout}
                className="rounded-full border border-line px-4 py-1.5 font-medium text-ink hover:bg-sand"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-line px-4 py-1.5 font-medium text-ink hover:bg-sand"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
