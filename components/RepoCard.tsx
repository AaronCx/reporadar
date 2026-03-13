import { GitHubRepo, relativeTime, getLanguageColor } from "@/lib/github";

export default function RepoCard({
  repo,
  index,
}: {
  repo: GitHubRepo;
  index: number;
}) {
  const delayClass = `animate-delay-${Math.min(index + 1, 6)}`;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`animate-fade-in-up ${delayClass} block p-4 sm:p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow hover:no-underline`}
    >
      <h3 className="font-mono font-bold text-[var(--accent)] truncate">
        {repo.name}
      </h3>
      {repo.description && (
        <p className="mt-1 text-sm text-[var(--text-dim)] line-clamp-2">
          {repo.description}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--text-dim)]">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        <span>&#9733; {repo.stargazers_count}</span>
        <span>&#128268; {repo.forks_count}</span>
        <span>{relativeTime(repo.updated_at)}</span>
      </div>
    </a>
  );
}
