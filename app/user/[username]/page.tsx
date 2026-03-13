import Link from "next/link";
import { fetchUserProfile } from "@/lib/github";
import UserProfile from "@/components/UserProfile";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  return {
    title: `${params.username} — RepoRadar`,
    description: `GitHub profile analysis for ${params.username}`,
  };
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  let profile;
  try {
    profile = await fetchUserProfile(params.username);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 page-enter">
        <div className="text-6xl mb-4">💀</div>
        <h1 className="text-2xl font-bold font-mono text-[var(--accent)] mb-2">
          {message === "User not found" ? "User Not Found" : "Error"}
        </h1>
        <p className="text-[var(--text-dim)] mb-6">{message}</p>
        <Link
          href="/"
          className="px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Scan Another
        </Link>
      </div>
    );
  }

  const { user, repos } = profile;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 page-enter space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Link
          href="/"
          className="font-mono font-bold text-[var(--accent)] text-xl hover:brightness-110"
        >
          RepoRadar<span className="cursor-blink">_</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/compare"
            className="px-3 sm:px-4 py-2 border border-[var(--card-border)] text-[var(--text-dim)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all text-sm font-semibold"
          >
            Compare
          </Link>
          <Link
            href="/"
            className="px-3 sm:px-4 py-2 border border-[var(--accent)] text-[var(--accent)] rounded-lg hover:bg-[var(--accent)] hover:text-black transition-all text-sm font-semibold"
          >
            Scan Another
          </Link>
        </div>
      </div>

      <UserProfile user={user} repos={repos} />
    </div>
  );
}
