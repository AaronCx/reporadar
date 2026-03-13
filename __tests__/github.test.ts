import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  GitHubRepo,
  getLanguageStats,
  getTopRepos,
  getTotalStats,
  getCreationDayStats,
  relativeTime,
  accountAge,
  getLanguageColor,
} from "@/lib/github";

function makeRepo(overrides: Partial<GitHubRepo> = {}): GitHubRepo {
  return {
    name: "test-repo",
    html_url: "https://github.com/test/test-repo",
    description: "A test repo",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2025-01-01T00:00:00Z",
    pushed_at: "2025-01-01T00:00:00Z",
    created_at: "2025-01-01T00:00:00Z",
    archived: false,
    ...overrides,
  };
}

describe("getLanguageStats", () => {
  it("returns correct percentages for repos with languages", () => {
    const repos = [
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: "TypeScript" }),
      makeRepo({ language: "Python" }),
      makeRepo({ language: "TypeScript" }),
    ];
    const stats = getLanguageStats(repos);
    expect(stats[0].language).toBe("TypeScript");
    expect(stats[0].count).toBe(3);
    expect(stats[0].percentage).toBe(75);
    expect(stats[1].language).toBe("Python");
    expect(stats[1].count).toBe(1);
    expect(stats[1].percentage).toBe(25);
  });

  it("ignores repos with null language", () => {
    const repos = [
      makeRepo({ language: "Go" }),
      makeRepo({ language: null }),
    ];
    const stats = getLanguageStats(repos);
    expect(stats).toHaveLength(1);
    expect(stats[0].language).toBe("Go");
    expect(stats[0].percentage).toBe(100);
  });

  it("returns empty array for no repos", () => {
    expect(getLanguageStats([])).toEqual([]);
  });
});

describe("getTopRepos", () => {
  it("sorts by stars descending and limits count", () => {
    const repos = Array.from({ length: 10 }, (_, i) =>
      makeRepo({ name: `repo-${i}`, stargazers_count: i })
    );
    const top = getTopRepos(repos, 3);
    expect(top).toHaveLength(3);
    expect(top[0].name).toBe("repo-9");
    expect(top[1].name).toBe("repo-8");
    expect(top[2].name).toBe("repo-7");
  });

  it("defaults to 6 results", () => {
    const repos = Array.from({ length: 10 }, (_, i) =>
      makeRepo({ name: `repo-${i}`, stargazers_count: i })
    );
    const top = getTopRepos(repos);
    expect(top).toHaveLength(6);
  });

  it("uses updated_at as tiebreaker", () => {
    const repos = [
      makeRepo({ name: "old", stargazers_count: 5, updated_at: "2024-01-01T00:00:00Z" }),
      makeRepo({ name: "new", stargazers_count: 5, updated_at: "2025-06-01T00:00:00Z" }),
    ];
    const top = getTopRepos(repos, 2);
    expect(top[0].name).toBe("new");
  });
});

describe("getTotalStats", () => {
  it("aggregates stars and forks correctly", () => {
    const repos = [
      makeRepo({ stargazers_count: 10, forks_count: 3, language: "Rust" }),
      makeRepo({ stargazers_count: 5, forks_count: 2, language: "Rust" }),
      makeRepo({ stargazers_count: 20, forks_count: 1, language: "Go" }),
    ];
    const stats = getTotalStats(repos);
    expect(stats.totalStars).toBe(35);
    expect(stats.totalForks).toBe(6);
    expect(stats.mostStarred?.name).toBe("test-repo");
    expect(stats.mostUsedLanguage).toBe("Rust");
  });

  it("handles empty repos array", () => {
    const stats = getTotalStats([]);
    expect(stats.totalStars).toBe(0);
    expect(stats.totalForks).toBe(0);
    expect(stats.mostStarred).toBeNull();
    expect(stats.mostUsedLanguage).toBe("N/A");
  });
});

describe("getCreationDayStats", () => {
  it("returns 7 days with correct counts", () => {
    // Use dates and verify totals rather than specific day names (timezone-dependent)
    const repos = [
      makeRepo({ created_at: "2025-01-06T12:00:00Z" }),
      makeRepo({ created_at: "2025-01-06T12:00:00Z" }),
      makeRepo({ created_at: "2025-01-08T12:00:00Z" }),
    ];
    const stats = getCreationDayStats(repos);
    expect(stats).toHaveLength(7);
    const totalCount = stats.reduce((sum, s) => sum + s.count, 0);
    expect(totalCount).toBe(3);
    // The day with 2 repos should have percentage 100 (it's the max)
    const maxDay = stats.find((s) => s.count === 2)!;
    expect(maxDay.percentage).toBe(100);
    // The day with 1 repo should have percentage 50
    const oneDayEntry = stats.find((s) => s.count === 1)!;
    expect(oneDayEntry.percentage).toBe(50);
  });
});

describe("relativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-16T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'just now' for very recent dates", () => {
    expect(relativeTime("2026-03-16T11:59:50Z")).toBe("just now");
  });

  it("returns minutes ago", () => {
    expect(relativeTime("2026-03-16T11:55:00Z")).toBe("5 minutes ago");
  });

  it("returns hours ago", () => {
    expect(relativeTime("2026-03-16T09:00:00Z")).toBe("3 hours ago");
  });

  it("returns days ago", () => {
    expect(relativeTime("2026-03-14T12:00:00Z")).toBe("2 days ago");
  });

  it("returns months ago", () => {
    expect(relativeTime("2025-12-16T12:00:00Z")).toBe("3 months ago");
  });

  it("returns years ago", () => {
    expect(relativeTime("2024-01-01T00:00:00Z")).toBe("2 years ago");
  });

  it("uses singular form for 1 unit", () => {
    expect(relativeTime("2025-03-16T12:00:00Z")).toBe("1 year ago");
  });
});

describe("accountAge", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-16T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates years correctly", () => {
    expect(accountAge("2021-03-16T00:00:00Z")).toBe(5);
  });

  it("returns 0 for recent accounts", () => {
    expect(accountAge("2026-01-01T00:00:00Z")).toBe(0);
  });
});

describe("getLanguageColor", () => {
  it("returns correct color for known languages", () => {
    expect(getLanguageColor("TypeScript")).toBe("#3178c6");
    expect(getLanguageColor("Python")).toBe("#3572A5");
    expect(getLanguageColor("JavaScript")).toBe("#f1e05a");
    expect(getLanguageColor("Rust")).toBe("#dea584");
  });

  it("returns fallback color for unknown languages", () => {
    expect(getLanguageColor("Brainfuck")).toBe("#00ff88");
  });
});
