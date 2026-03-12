import Link from "next/link";
import {
  fetchUserProfile,
  getTotalStats,
  getLanguageStats,
  accountAge,
  getLanguageColor,
  UserProfile,
} from "@/lib/github";
import CompareForm from "@/components/CompareForm";

export const metadata = {
  title: "Compare — RepoRadar",
  description: "Compare two GitHub profiles side by side",
};

interface CompareMetric {
  label: string;
  value1: string | number;
  value2: string | number;
  numeric1: number;
  numeric2: number;
}

function buildMetrics(
  p1: UserProfile,
  p2: UserProfile
): CompareMetric[] {
  const stats1 = getTotalStats(p1.repos);
  const stats2 = getTotalStats(p2.repos);
  const lang1 = getLanguageStats(p1.repos);
  const lang2 = getLanguageStats(p2.repos);
  const age1 = accountAge(p1.user.created_at);
  const age2 = accountAge(p2.user.created_at);

  return [
    {
      label: "Public Repos",
      value1: p1.user.public_repos,
      value2: p2.user.public_repos,
      numeric1: p1.user.public_repos,
      numeric2: p2.user.public_repos,
    },
    {
      label: "Total Stars",
      value1: stats1.totalStars,
      value2: stats2.totalStars,
      numeric1: stats1.totalStars,
      numeric2: stats2.totalStars,
    },
    {
      label: "Total Forks",
      value1: stats1.totalForks,
      value2: stats2.totalForks,
      numeric1: stats1.totalForks,
      numeric2: stats2.totalForks,
    },
    {
      label: "Followers",
      value1: p1.user.followers,
      value2: p2.user.followers,
      numeric1: p1.user.followers,
      numeric2: p2.user.followers,
    },
    {
      label: "Top Language",
      value1: lang1.length ? lang1[0].language : "N/A",
      value2: lang2.length ? lang2[0].language : "N/A",
      numeric1: lang1.length ? lang1[0].count : 0,
      numeric2: lang2.length ? lang2[0].count : 0,
    },
    {
      label: "Account Age",
      value1: `${age1}y`,
      value2: `${age2}y`,
      numeric1: age1,
      numeric2: age2,
    },
  ];
}

function BarComparison({
  label,
  value1,
  value2,
  numeric1,
  numeric2,
}: CompareMetric) {
  const max = Math.max(numeric1, numeric2, 1);
  const pct1 = (numeric1 / max) * 100;
  const pct2 = (numeric2 / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--accent)] font-mono font-bold">
          {value1}
        </span>
        <span className="text-[var(--text-dim)] text-xs">{label}</span>
        <span className="text-cyan-400 font-mono font-bold">{value2}</span>
      </div>
      <div className="flex gap-1 h-4">
        <div className="flex-1 flex justify-end">
          <div
            className="h-full rounded-l transition-all"
            style={{
              width: `${pct1}%`,
              backgroundColor: "var(--accent)",
              minWidth: numeric1 > 0 ? "4px" : "0",
            }}
          />
        </div>
        <div className="flex-1">
          <div
            className="h-full rounded-r transition-all"
            style={{
              width: `${pct2}%`,
              backgroundColor: "#22d3ee",
              minWidth: numeric2 > 0 ? "4px" : "0",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { user1?: string; user2?: string };
}) {
  const { user1, user2 } = searchParams;

  const hasUsers = user1 && user2;

  let profile1: UserProfile | null = null;
  let profile2: UserProfile | null = null;
  let error: string | null = null;

  if (hasUsers) {
    try {
      [profile1, profile2] = await Promise.all([
        fetchUserProfile(user1),
        fetchUserProfile(user2),
      ]);
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to fetch profiles";
    }
  }

  const metrics =
    profile1 && profile2 ? buildMetrics(profile1, profile2) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 page-enter space-y-8">
      {/* Nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-bold text-[var(--accent)] text-xl hover:brightness-110"
        >
          RepoRadar<span className="cursor-blink">_</span>
        </Link>
        <Link
          href="/"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] rounded-lg hover:bg-[var(--accent)] hover:text-black transition-all text-sm font-semibold"
        >
          Scan Another
        </Link>
      </div>

      {/* Title */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold font-mono text-[var(--accent)]">
          Compare Profiles
        </h1>
        <CompareForm initialUser1={user1} initialUser2={user2} />
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-center text-red-300">
          {error}
        </div>
      )}

      {/* Results */}
      {profile1 && profile2 && metrics && (
        <div className="space-y-8 animate-fade-in-up">
          {/* User headers side by side */}
          <div className="grid grid-cols-2 gap-4">
            {[profile1, profile2].map((profile, idx) => (
              <div
                key={profile.user.login}
                className="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow text-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.user.avatar_url}
                  alt={profile.user.login}
                  width={80}
                  height={80}
                  className={`rounded-full mx-auto mb-3 border-2 ${
                    idx === 0
                      ? "border-[var(--accent)]"
                      : "border-cyan-400"
                  }`}
                />
                <h2
                  className={`font-mono font-bold text-lg ${
                    idx === 0 ? "text-[var(--accent)]" : "text-cyan-400"
                  }`}
                >
                  {profile.user.name || profile.user.login}
                </h2>
                <a
                  href={profile.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-dim)] hover:text-[var(--text)]"
                >
                  @{profile.user.login}
                </a>
                {profile.user.bio && (
                  <p className="text-xs text-[var(--text-dim)] mt-2 line-clamp-2">
                    {profile.user.bio}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bar chart comparison */}
          <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow space-y-5">
            <h2 className="text-lg font-bold font-mono text-[var(--accent)] mb-2">
              Head to Head
            </h2>
            <div className="flex justify-between text-xs text-[var(--text-dim)] mb-4">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-[var(--accent)] inline-block" />
                {profile1.user.login}
              </span>
              <span className="flex items-center gap-1">
                {profile2.user.login}
                <span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block" />
              </span>
            </div>
            {metrics.map((m) => (
              <BarComparison key={m.label} {...m} />
            ))}
          </div>

          {/* Language comparison */}
          <div className="grid grid-cols-2 gap-4">
            {[profile1, profile2].map((profile, idx) => {
              const langs = getLanguageStats(profile.repos).slice(0, 5);
              return (
                <div
                  key={profile.user.login}
                  className="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow"
                >
                  <h3
                    className={`text-sm font-bold font-mono mb-3 ${
                      idx === 0 ? "text-[var(--accent)]" : "text-cyan-400"
                    }`}
                  >
                    Languages — {profile.user.login}
                  </h3>
                  <div className="space-y-2">
                    {langs.map((lang) => (
                      <div key={lang.language} className="flex items-center gap-2 text-sm">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                          style={{
                            backgroundColor: getLanguageColor(lang.language),
                          }}
                        />
                        <span className="text-[var(--text)] flex-1 truncate">
                          {lang.language}
                        </span>
                        <span className="text-[var(--text-dim)] text-xs">
                          {lang.percentage}%
                        </span>
                      </div>
                    ))}
                    {langs.length === 0 && (
                      <span className="text-[var(--text-dim)] text-xs">
                        No language data
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prompt if no users */}
      {!hasUsers && !error && (
        <div className="text-center text-[var(--text-dim)] py-12">
          Enter two GitHub usernames above to compare their profiles.
        </div>
      )}
    </div>
  );
}
