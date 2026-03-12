"use client";

import { useMemo } from "react";
import { GitHubRepo } from "@/lib/github";

interface DataPoint {
  date: Date;
  cumulativeStars: number;
  label: string;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatDateFull(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function StarHistory({ repos }: { repos: GitHubRepo[] }) {
  const dataPoints = useMemo(() => {
    // Sort repos by creation date
    const sorted = [...repos]
      .filter((r) => r.created_at)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

    if (sorted.length === 0) return [];

    // Build cumulative star data
    let cumulative = 0;
    const points: DataPoint[] = [];

    // Add a zero-point before the first repo
    const firstDate = new Date(sorted[0].created_at);
    const zeroDate = new Date(firstDate);
    zeroDate.setDate(zeroDate.getDate() - 1);
    points.push({
      date: zeroDate,
      cumulativeStars: 0,
      label: "",
    });

    for (const repo of sorted) {
      cumulative += repo.stargazers_count;
      points.push({
        date: new Date(repo.created_at),
        cumulativeStars: cumulative,
        label: `${repo.name} (+${repo.stargazers_count})`,
      });
    }

    return points;
  }, [repos]);

  if (dataPoints.length < 2) return null;

  const totalStars = dataPoints[dataPoints.length - 1].cumulativeStars;
  if (totalStars === 0) return null;

  // Chart dimensions
  const width = 700;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scales
  const minTime = dataPoints[0].date.getTime();
  const maxTime = dataPoints[dataPoints.length - 1].date.getTime();
  const timeRange = maxTime - minTime || 1;
  const maxStars = totalStars;

  const scaleX = (time: number) =>
    padding.left + ((time - minTime) / timeRange) * chartWidth;
  const scaleY = (stars: number) =>
    padding.top + chartHeight - (stars / maxStars) * chartHeight;

  // Build path
  const linePath = dataPoints
    .map((p, i) => {
      const x = scaleX(p.date.getTime());
      const y = scaleY(p.cumulativeStars);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Build fill area path
  const areaPath =
    linePath +
    ` L ${scaleX(dataPoints[dataPoints.length - 1].date.getTime())} ${padding.top + chartHeight}` +
    ` L ${scaleX(dataPoints[0].date.getTime())} ${padding.top + chartHeight} Z`;

  // Y-axis ticks
  const yTickCount = 5;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) =>
    Math.round((maxStars / yTickCount) * i)
  );

  // X-axis ticks (aim for ~5 labels)
  const xTickCount = Math.min(5, dataPoints.length);
  const xTicks: Date[] = [];
  for (let i = 0; i < xTickCount; i++) {
    const t = minTime + (timeRange / (xTickCount - 1 || 1)) * i;
    xTicks.push(new Date(t));
  }

  return (
    <div className="animate-fade-in-up animate-delay-5 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow">
      <h2 className="text-lg font-bold font-mono text-[var(--accent)] mb-4">
        Star History
      </h2>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="starAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tick) => (
            <line
              key={`grid-${tick}`}
              x1={padding.left}
              y1={scaleY(tick)}
              x2={width - padding.right}
              y2={scaleY(tick)}
              stroke="#1a1a1a"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {yTicks.map((tick) => (
            <text
              key={`y-${tick}`}
              x={padding.left - 8}
              y={scaleY(tick) + 4}
              textAnchor="end"
              fontSize="11"
              fill="#666"
              fontFamily="sans-serif"
            >
              {tick}
            </text>
          ))}

          {/* X-axis labels */}
          {xTicks.map((tick, i) => (
            <text
              key={`x-${i}`}
              x={scaleX(tick.getTime())}
              y={height - 8}
              textAnchor="middle"
              fontSize="11"
              fill="#666"
              fontFamily="sans-serif"
            >
              {formatDate(tick)}
            </text>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#starAreaGrad)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#00ff88"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Data points */}
          {dataPoints.slice(1).map((p, i) => (
            <g key={i}>
              <circle
                cx={scaleX(p.date.getTime())}
                cy={scaleY(p.cumulativeStars)}
                r="3"
                fill="#00ff88"
                opacity="0.8"
              >
                <title>
                  {formatDateFull(p.date)}: {p.cumulativeStars} total stars
                  {p.label ? ` — ${p.label}` : ""}
                </title>
              </circle>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-dim)]">
        <span
          className="inline-block w-3 h-0.5 rounded"
          style={{ backgroundColor: "#00ff88" }}
        />
        Cumulative stars across {repos.length} repos
      </div>
    </div>
  );
}
