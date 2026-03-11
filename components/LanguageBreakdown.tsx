import { GitHubRepo, getLanguageStats, getLanguageColor } from "@/lib/github";

export default function LanguageBreakdown({ repos }: { repos: GitHubRepo[] }) {
  const stats = getLanguageStats(repos);
  if (stats.length === 0) return null;

  const top5 = stats.slice(0, 5);

  // Donut chart parameters
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;

  // Build segments
  let cumulativeOffset = 0;
  const segments = stats.map((s) => {
    const dashLength = (s.percentage / 100) * circumference;
    const dashGap = circumference - dashLength;
    const offset = -cumulativeOffset;
    cumulativeOffset += dashLength;
    return {
      language: s.language,
      percentage: s.percentage,
      color: getLanguageColor(s.language),
      dashArray: `${dashLength} ${dashGap}`,
      dashOffset: offset,
    };
  });

  return (
    <div className="animate-fade-in-up animate-delay-2 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow">
      <h2 className="text-lg font-bold font-mono text-[var(--accent)] mb-4">
        Language Breakdown
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Donut chart */}
        <div className="relative flex-shrink-0">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={strokeWidth}
            />
            {/* Segments */}
            {segments.map((seg) => (
              <circle
                key={seg.language}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={seg.dashArray}
                strokeDashoffset={seg.dashOffset}
                strokeLinecap="butt"
              >
                <title>
                  {seg.language}: {seg.percentage}%
                </title>
              </circle>
            ))}
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono text-[var(--accent)]">
              {stats.length}
            </span>
            <span className="text-xs text-[var(--text-dim)]">
              {stats.length === 1 ? "language" : "languages"}
            </span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          {/* Stacked bar */}
          <div className="w-full h-6 rounded-full overflow-hidden flex">
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
              <div
                key={s.language}
                className="flex items-center gap-2 text-sm"
              >
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
      </div>
    </div>
  );
}
