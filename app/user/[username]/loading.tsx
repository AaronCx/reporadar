export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 page-enter">
      {/* Nav skeleton */}
      <div className="flex items-center justify-between">
        <div className="skeleton h-7 w-32" />
        <div className="skeleton h-10 w-28 rounded-lg" />
      </div>

      {/* Profile header skeleton */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
        <div className="skeleton w-[120px] h-[120px] rounded-full" />
        <div className="flex-1 space-y-3 w-full">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-4 w-full max-w-md" />
          <div className="flex gap-4">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-4 w-20" />
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

      {/* Language skeleton */}
      <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
        <div className="skeleton h-6 w-48 mb-4" />
        <div className="skeleton h-6 w-full rounded-full mb-4" />
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-4 w-24" />
          ))}
        </div>
      </div>

      {/* Repo cards skeleton */}
      <div>
        <div className="skeleton h-6 w-36 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl"
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
    </div>
  );
}
