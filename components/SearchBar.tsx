"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) {
      router.push(`/user/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a GitHub username"
        className="flex-1 px-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)] font-sans transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all font-sans"
      >
        Scan
      </button>
    </form>
  );
}
