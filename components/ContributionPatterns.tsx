import { GitHubRepo, getCreationDayStats } from "@/lib/github";

export default function ContributionPatterns({
  repos,
}: {
  repos: GitHubRepo[];
}) {
  const dayStats = getCreationDayStats(repos);
  if (repos.length === 0) return null;

  return (
    <div className="animate-fade-in-up animate-delay-4 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow">
      <h2 className="text-lg font-bold font-mono text-[var(--accent)] mb-4">
        Repo Creation Patterns
      </h2>
      <div className="flex items-end gap-3 h-32">
        {dayStats.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col justify-end h-24">
              <div
                className="w-full rounded-t transition-all"
                style={{
                  height: `${Math.max(d.percentage, 4)}%`,
                  backgroundColor: d.count > 0 ? "var(--accent)" : "#1a1a1a",
                  opacity: d.count > 0 ? 0.8 : 0.3,
                }}
              />
            </div>
            <span className="text-xs text-[var(--text-dim)]">{d.day}</span>
            <span className="text-xs text-[var(--text-dim)]">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
