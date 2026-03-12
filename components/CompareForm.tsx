"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompareForm({
  initialUser1,
  initialUser2,
}: {
  initialUser1?: string;
  initialUser2?: string;
}) {
  const [user1, setUser1] = useState(initialUser1 || "");
  const [user2, setUser2] = useState(initialUser2 || "");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u1 = user1.trim();
    const u2 = user2.trim();
    if (u1 && u2) {
      router.push(
        `/compare?user1=${encodeURIComponent(u1)}&user2=${encodeURIComponent(u2)}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
      <input
        type="text"
        value={user1}
        onChange={(e) => setUser1(e.target.value)}
        placeholder="Username 1"
        className="flex-1 px-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)] font-sans transition-colors"
      />
      <span className="text-[var(--accent)] font-mono font-bold text-xl self-center">
        vs
      </span>
      <input
        type="text"
        value={user2}
        onChange={(e) => setUser2(e.target.value)}
        placeholder="Username 2"
        className="flex-1 px-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)] font-sans transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all font-sans"
      >
        Compare
      </button>
    </form>
  );
}
