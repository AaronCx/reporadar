import { GitHubRepo, getLanguageStats, getLanguageColor } from "@/lib/github";

export default function LanguageBreakdown({ repos }: { repos: GitHubRepo[] }) {
  const stats = getLanguageStats(repos);
  if (stats.length === 0) return null;

  const top5 = stats.slice(0, 5);

  return (
    <div className="animate-fade-in-up animate-delay-2 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow">
      <h2 className="text-lg font-bold font-mono text-[var(--accent)] mb-4">
        Language Breakdown
      </h2>

      {/* Stacked bar */}
      <div className="w-full h-6 rounded-full overflow-hidden flex mb-4">
        {stats.map((s) => (
          <div
            key={s.language}
            style={{
              width: `${s.percentage}%`,
              backgroundColor: getLanguageColor(s.language),
              minWidth: s.percentage > 0 ? "4px" : "0",
            }}
            title={`${s.language}: ${s.percentage}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {top5.map((s) => (
          <div key={s.language} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: getLanguageColor(s.language) }}
            />
            <span className="text-[var(--text)]">{s.language}</span>
            <span className="text-[var(--text-dim)]">{s.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
