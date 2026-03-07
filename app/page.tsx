import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 page-enter">
      <h1 className="text-5xl sm:text-7xl font-bold font-mono text-[var(--accent)] mb-2">
        RepoRadar<span className="cursor-blink">_</span>
      </h1>
      <p className="text-[var(--text-dim)] text-lg mb-8 font-sans">
        Scan any GitHub profile
      </p>
      <SearchBar />
    </div>
  );
}
