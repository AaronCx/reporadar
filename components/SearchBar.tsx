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
    <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 w-full max-w-md px-2 sm:px-0">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a GitHub username"
        className="flex-1 min-w-0 px-3 sm:px-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)] font-sans transition-colors text-base"
      />
      <button
        type="submit"
        className="px-4 sm:px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all font-sans whitespace-nowrap"
      >
        Scan
      </button>
    </form>
  );
}
