export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  archived: boolean;
}

export interface UserProfile {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export async function fetchUserProfile(username: string): Promise<UserProfile> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      cache: "no-store",
    }),
    fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { cache: "no-store" }
    ),
  ]);

  if (!userRes.ok) {
    if (userRes.status === 404) {
      throw new Error("User not found");
    }
    throw new Error(`GitHub API error: ${userRes.status}`);
  }

  const user: GitHubUser = await userRes.json();
  const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

  return { user, repos };
}

export function getLanguageStats(repos: GitHubRepo[]) {
  const counts: Record<string, number> = {};
  let total = 0;
  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      total++;
    }
  }
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
    }));
  return sorted;
}

export function getTopRepos(repos: GitHubRepo[], count = 6) {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, count);
}

export function getTotalStats(repos: GitHubRepo[]) {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const mostStarred = repos.length
    ? [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0]
    : null;
  const langStats = getLanguageStats(repos);
  const mostUsedLanguage = langStats.length ? langStats[0].language : "N/A";

  return { totalStars, totalForks, mostStarred, mostUsedLanguage };
}

export function getCreationDayStats(repos: GitHubRepo[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const counts = new Array(7).fill(0);
  for (const repo of repos) {
    const day = new Date(repo.created_at).getDay();
    counts[day]++;
  }
  const max = Math.max(...counts, 1);
  return days.map((day, i) => ({ day, count: counts[i], percentage: Math.round((counts[i] / max) * 100) }));
}

export function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
}

export function accountAge(createdAt: string): number {
  const now = new Date();
  const created = new Date(createdAt);
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Lua: "#000080",
  Scala: "#c22d40",
  R: "#198CE7",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
  Zig: "#ec915c",
  Nim: "#ffc200",
  OCaml: "#3be133",
};

export function getLanguageColor(language: string): string {
  return LANG_COLORS[language] || "#00ff88";
}
