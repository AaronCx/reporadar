"use client";

import { useState } from "react";
import { GitHubRepo } from "@/lib/github";

interface DayData {
  date: string;
  count: number;
}

function buildHeatmapData(repos: GitHubRepo[]): DayData[] {
  const counts: Record<string, number> = {};

  for (const repo of repos) {
    for (const dateStr of [repo.updated_at, repo.pushed_at]) {
      if (!dateStr) continue;
      const date = new Date(dateStr);
      const key = date.toISOString().slice(0, 10);
      counts[key] = (counts[key] || 0) + 1;
    }
  }

  // Build 52 weeks of data ending today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: DayData[] = [];

  // Go back to fill 52 weeks (364 days)
  const start = new Date(today);
  start.setDate(start.getDate() - 363);

  // Adjust start to the nearest Sunday
  const startDay = start.getDay();
  start.setDate(start.getDate() - startDay);

  const current = new Date(start);
  while (current <= today) {
    const key = current.toISOString().slice(0, 10);
    days.push({ date: key, count: counts[key] || 0 });
    current.setDate(current.getDate() + 1);
  }

  return days;
}

function getColor(count: number, max: number): string {
  if (count === 0) return "#161b22";
  const intensity = Math.min(count / Math.max(max, 1), 1);
  if (intensity <= 0.25) return "#003d1f";
  if (intensity <= 0.5) return "#006d32";
  if (intensity <= 0.75) return "#00a648";
  return "#00ff88";
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function CommitHeatmap({ repos }: { repos: GitHubRepo[] }) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  if (repos.length === 0) return null;

  const days = buildHeatmapData(repos);
  const max = Math.max(...days.map((d) => d.count), 1);

  // Organize into weeks (columns) of 7 days (rows)
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];

  // Pad the first week if it doesn't start on Sunday
  const firstDate = new Date(days[0].date);
  const firstDay = firstDate.getDay();
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ date: "", count: -1 }); // placeholder
  }

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Determine month labels for columns
  const monthMarkers: { week: number; label: string }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < weeks.length; w++) {
    const firstValid = weeks[w].find((d) => d.count >= 0);
    if (firstValid && firstValid.date) {
      const month = new Date(firstValid.date).getMonth();
      if (month !== lastMonth) {
        monthMarkers.push({ week: w, label: MONTH_LABELS[month] });
        lastMonth = month;
      }
    }
  }

  const cellSize = 12;
  const cellGap = 2;
  const step = cellSize + cellGap;
  const leftPad = 30;
  const topPad = 20;
  const svgWidth = leftPad + weeks.length * step + 10;
  const svgHeight = topPad + 7 * step + 10;

  return (
    <div className="animate-fade-in-up animate-delay-3 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow">
      <h2 className="text-lg font-bold font-mono text-[var(--accent)] mb-4">
        Update Activity
      </h2>
      <div className="overflow-x-auto">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="block"
          onMouseLeave={() => setTooltip(null)}
        >
          {/* Month labels */}
          {monthMarkers.map((m) => (
            <text
              key={`month-${m.week}`}
              x={leftPad + m.week * step}
              y={12}
              fontSize={10}
              fill="#666"
              fontFamily="sans-serif"
            >
              {m.label}
            </text>
          ))}

          {/* Day labels */}
          {DAY_LABELS.map((label, i) =>
            label ? (
              <text
                key={`day-${i}`}
                x={0}
                y={topPad + i * step + cellSize - 2}
                fontSize={10}
                fill="#666"
                fontFamily="sans-serif"
              >
                {label}
              </text>
            ) : null
          )}

          {/* Cells */}
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              if (day.count < 0) return null;
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={leftPad + wi * step}
                  y={topPad + di * step}
                  width={cellSize}
                  height={cellSize}
                  rx={2}
                  ry={2}
                  fill={getColor(day.count, max)}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    const formatted = new Date(
                      day.date + "T00:00:00"
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    setTooltip({
                      text: `${formatted}: ${day.count} update${day.count !== 1 ? "s" : ""}`,
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-xs text-[var(--text-dim)]">
        <span>Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
          <span
            key={i}
            className="inline-block w-3 h-3 rounded-sm"
            style={{
              backgroundColor: getColor(
                intensity === 0 ? 0 : Math.ceil(intensity * max),
                max
              ),
            }}
          />
        ))}
        <span>More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 text-xs bg-[#1a1a1a] border border-[var(--card-border)] rounded text-[var(--text)] pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 30,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
