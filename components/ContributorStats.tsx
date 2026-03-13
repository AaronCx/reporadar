"use client";

import { GitHubRepo, getLanguageStats, getLanguageColor } from "@/lib/github";

interface FreshnessCategory {
  label: string;
  count: number;
  color: string;
}

function getFreshnessBreakdown(repos: GitHubRepo[]): FreshnessCategory[] {
  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;

  let last30 = 0;
  let last90 = 0;
  let last365 = 0;
  let stale = 0;

  for (const repo of repos) {
    const updated = new Date(repo.updated_at).getTime();
    const age = now - updated;

    if (age <= 30 * day) {
      last30++;
    } else if (age <= 90 * day) {
      last90++;
    } else if (age <= 365 * day) {
      last365++;
    } else {
      stale++;
    }
  }

  return [
    { label: "Last 30 days", count: last30, color: "#00ff88" },
    { label: "Last 90 days", count: last90, color: "#00cc6a" },
    { label: "Last year", count: last365, color: "#008844" },
    { label: "Stale (1y+)", count: stale, color: "#333333" },
  ];
}

export default function ContributorStats({
  repos,
}: {
  repos: GitHubRepo[];
}) {
  if (repos.length === 0) return null;

  const langStats = getLanguageStats(repos);
  const freshness = getFreshnessBreakdown(repos);
  const archivedCount = repos.filter((r) => r.archived).length;
  const activeCount = repos.length - archivedCount;
  const totalFreshness = freshness.reduce((sum, f) => sum + f.count, 0);

  return (
    <div className="animate-fade-in-up animate-delay-5 space-y-4">
      <h2 className="text-lg font-bold font-mono text-[var(--accent)]">
        Repository Activity Breakdown
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language distribution */}
        <div className="p-4 sm:p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow">
          <h3 className="text-sm font-bold font-mono text-[var(--accent)] mb-3">
            Repos by Language
          </h3>
          <div className="space-y-2">
            {langStats.slice(0, 8).map((lang) => {
              const barWidth = Math.max(
                (lang.count / Math.max(langStats[0].count, 1)) * 100,
                4
              );
              return (
                <div key={lang.language} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                    style={{ backgroundColor: getLanguageColor(lang.language) }}
                  />
                  <span className="text-sm text-[var(--text)] w-24 truncate">
                    {lang.language}
                  </span>
                  <div className="flex-1 h-3 bg-[var(--bg)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: getLanguageColor(lang.language),
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <span className="text-xs text-[var(--text-dim)] w-6 text-right">
                    {lang.count}
                  </span>
                </div>
              );
            })}
            {langStats.length === 0 && (
              <span className="text-sm text-[var(--text-dim)]">
                No language data available
              </span>
            )}
          </div>
        </div>

        {/* Freshness breakdown */}
        <div className="p-4 sm:p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow">
          <h3 className="text-sm font-bold font-mono text-[var(--accent)] mb-3">
            Update Freshness
          </h3>

          {/* Stacked bar */}
          <div className="w-full h-5 rounded-full overflow-hidden flex mb-4">
            {freshness.map((f) =>
              f.count > 0 ? (
                <div
                  key={f.label}
                  style={{
                    width: `${(f.count / totalFreshness) * 100}%`,
                    backgroundColor: f.color,
                    minWidth: "4px",
                  }}
                  title={`${f.label}: ${f.count}`}
                />
              ) : null
            )}
          </div>

          <div className="space-y-2">
            {freshness.map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-sm">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: f.color }}
                />
                <span className="text-[var(--text)] flex-1">{f.label}</span>
                <span className="text-[var(--text-dim)] font-mono text-xs">
                  {f.count} repo{f.count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>

          {/* Archived vs Active */}
          <div className="mt-4 pt-3 border-t border-[var(--card-border)]">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full inline-block bg-[var(--accent)]" />
                <span className="text-[var(--text)]">Active</span>
                <span className="text-[var(--text-dim)] font-mono text-xs">
                  {activeCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-dim)] font-mono text-xs">
                  {archivedCount}
                </span>
                <span className="text-[var(--text)]">Archived</span>
                <span className="w-2.5 h-2.5 rounded-full inline-block bg-[var(--text-dim)]" />
              </div>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden flex mt-2">
              {activeCount > 0 && (
                <div
                  className="h-full"
                  style={{
                    width: `${(activeCount / repos.length) * 100}%`,
                    backgroundColor: "var(--accent)",
                  }}
                />
              )}
              {archivedCount > 0 && (
                <div
                  className="h-full"
                  style={{
                    width: `${(archivedCount / repos.length) * 100}%`,
                    backgroundColor: "#666",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
