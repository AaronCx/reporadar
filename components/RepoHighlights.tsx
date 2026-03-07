import { GitHubRepo, getTopRepos } from "@/lib/github";
import RepoCard from "./RepoCard";

export default function RepoHighlights({ repos }: { repos: GitHubRepo[] }) {
  const top = getTopRepos(repos);
  if (top.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold font-mono text-[var(--accent)] mb-4">
        Repo Highlights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {top.map((repo, i) => (
          <RepoCard key={repo.name} repo={repo} index={i} />
        ))}
      </div>
    </div>
  );
}
