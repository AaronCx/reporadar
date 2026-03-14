export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 page-enter">
      {/* Nav skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="skeleton h-7 w-32" />
        <div className="flex gap-2 sm:gap-3">
          <div className="skeleton h-10 w-24 rounded-lg" />
          <div className="skeleton h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Profile header skeleton */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
        <div className="skeleton w-24 h-24 sm:w-[120px] sm:h-[120px] rounded-full" />
        <div className="flex-1 space-y-3 w-full">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-4 w-full max-w-md" />
          <div className="flex flex-wrap gap-4">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div>
        <div className="skeleton h-6 w-36 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-center"
            >
              <div className="skeleton h-8 w-16 mx-auto mb-2" />
              <div className="skeleton h-3 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Language breakdown skeleton */}
      <div className="p-4 sm:p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
        <div className="skeleton h-6 w-48 mb-4" />
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Donut placeholder */}
          <div className="skeleton w-[200px] h-[200px] rounded-full flex-shrink-0" />
          <div className="flex-1 w-full space-y-4">
            <div className="skeleton h-6 w-full rounded-full" />
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton h-4 w-24" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Commit heatmap skeleton */}
      <div className="p-4 sm:p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
        <div className="skeleton h-6 w-40 mb-4" />
        <div className="skeleton h-[120px] w-full rounded-lg" />
        <div className="flex items-center gap-2 mt-3">
          <div className="skeleton h-3 w-8" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton w-3 h-3 rounded-sm" />
          ))}
          <div className="skeleton h-3 w-8" />
        </div>
      </div>

      {/* Star history chart skeleton */}
      <div className="p-4 sm:p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
        <div className="skeleton h-6 w-32 mb-4" />
        <div className="skeleton h-[200px] w-full rounded-lg" />
        <div className="flex items-center gap-2 mt-3">
          <div className="skeleton h-3 w-3 rounded" />
          <div className="skeleton h-3 w-48" />
        </div>
      </div>

      {/* Repo cards skeleton */}
      <div>
        <div className="skeleton h-6 w-36 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl"
            >
              <div className="skeleton h-5 w-32 mb-2" />
              <div className="skeleton h-4 w-full mb-1" />
              <div className="skeleton h-4 w-3/4 mb-3" />
              <div className="flex gap-3">
                <div className="skeleton h-3 w-16" />
                <div className="skeleton h-3 w-12" />
                <div className="skeleton h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contributor stats skeleton */}
      <div>
        <div className="skeleton h-6 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Language distribution */}
          <div className="p-4 sm:p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
            <div className="skeleton h-5 w-36 mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="skeleton w-2.5 h-2.5 rounded-full" />
                  <div className="skeleton h-3 w-20" />
                  <div className="skeleton h-3 flex-1 rounded-full" />
                  <div className="skeleton h-3 w-6" />
                </div>
              ))}
            </div>
          </div>
          {/* Freshness breakdown */}
          <div className="p-4 sm:p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
            <div className="skeleton h-5 w-36 mb-3" />
            <div className="skeleton h-5 w-full rounded-full mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="skeleton w-2.5 h-2.5 rounded-full" />
                  <div className="skeleton h-3 flex-1" />
                  <div className="skeleton h-3 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
