import Image from "next/image";
import { GitHubUser, accountAge } from "@/lib/github";

export default function ProfileHeader({ user }: { user: GitHubUser }) {
  const age = accountAge(user.created_at);

  return (
    <div className="animate-fade-in-up flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl card-glow">
      <Image
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        width={120}
        height={120}
        className="rounded-full border-2 border-[var(--accent)]"
      />
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-2xl font-bold font-mono text-[var(--accent)]">
          {user.name || user.login}
        </h1>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
        >
          @{user.login}
        </a>
        {user.bio && <p className="mt-2 text-[var(--text)]">{user.bio}</p>}
        <div className="mt-3 flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-[var(--text-dim)]">
          {user.location && (
            <span>
              📍 {user.location}
            </span>
          )}
          <span>
            <strong className="text-[var(--text)]">{user.followers}</strong>{" "}
            followers
          </span>
          <span>
            <strong className="text-[var(--text)]">{user.following}</strong>{" "}
            following
          </span>
          <span>
            Joined{" "}
            <strong className="text-[var(--text)]">{age} year{age !== 1 ? "s" : ""}</strong>{" "}
            ago
          </span>
        </div>
      </div>
    </div>
  );
}
