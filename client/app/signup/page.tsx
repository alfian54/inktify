"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup(username, email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="mx-auto mt-16 max-w-md rounded-xl border border-line bg-white p-8">
        <h2 className="font-serif text-xl font-semibold text-center mx-0 mb-3">
          Create an account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-line px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand rounded-lg px-4 py-2 text-white disabled:opacity-50 hover:opacity-90"
          >
            {submitting ? "Signing Up..." : "Sign Up"}
          </button>
          <Link
            href="/login"
            className="text-sm text-center text-brand hover:underline"
          >
            Already have an account ? Log in
          </Link>
        </form>
      </div>
    </main>
  );
}
