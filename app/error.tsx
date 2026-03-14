"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 page-enter">
      <div className="text-6xl mb-4">&#128165;</div>
      <h1 className="text-2xl font-bold font-mono text-[var(--accent)] mb-2">
        Something went wrong
      </h1>
      <p className="text-[var(--text-dim)] mb-2 text-center max-w-md">
        An unexpected error occurred while loading this page.
      </p>
      {error.message && (
        <p className="text-sm text-[var(--text-dim)] mb-6 text-center max-w-md font-mono opacity-60">
          {error.message}
        </p>
      )}
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:brightness-110 transition-all"
        >
          Try Again
        </button>
        <a
          href="/"
          className="px-6 py-3 border border-[var(--card-border)] text-[var(--text-dim)] font-semibold rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
