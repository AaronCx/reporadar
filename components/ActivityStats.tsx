import { GitHubUser, GitHubRepo, getTotalStats, accountAge } from "@/lib/github";

export default function ActivityStats({
  user,
  repos,
}: {
  user: GitHubUser;
  repos: GitHubRepo[];
}) {
  const { totalStars, totalForks, mostStarred, mostUsedLanguage } =
    getTotalStats(repos);
  const age = accountAge(user.created_at);

  const stats = [
    { label: "Public Repos", value: user.public_repos },
    { label: "Total Stars", value: totalStars },
    { label: "Total Forks", value: totalForks },
    { label: "Top Language", value: mostUsedLanguage },
    {
      label: "Most Starred",
      value: mostStarred ? mostStarred.name : "N/A",
    },
    { label: "Account Age", value: `${age}y` },
  ];

  return (
    <div className="animate-fade-in-up animate-delay-3">
      <h2 className="text-lg font-bold font-mono text-[var(--accent)] mb-4">
        Activity Stats
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow text-center"
          >
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">
              {s.value}
            </div>
            <div className="text-xs text-[var(--text-dim)] mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
