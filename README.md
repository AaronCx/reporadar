# RepoRadar

Scan any public GitHub profile and get an instant visual developer profile with analytics, language breakdowns, and contribution patterns.

**[Try it live](https://reporadar-rho.vercel.app)**

## Features

- **Profile Overview** — Avatar, bio, location, followers/following, account age
- **Activity Stats** — Public repos, total stars, total forks, most-used language, most-starred repo
- **Language Breakdown** — Interactive donut chart with stacked bar and top-5 legend
- **Repository Highlights** — Top 6 repos sorted by stars, showing language, stars, forks, and last update
- **Contribution Patterns** — Bar chart of which days of the week repos are created most
- **Commit Activity Heatmap** — GitHub-style heatmap showing update activity over the past year
- **Star History Chart** — Cumulative star count over time with interactive data points
- **Comparison Mode** — Side-by-side comparison of two GitHub profiles
- **Repository Activity Breakdown** — Language distribution bars and update freshness categories
- **Date Range Filtering** — Filter analytics by repo creation or update date
- **CSV/JSON Export** — Export filtered analytics data in CSV or JSON format
- **API Response Caching** — In-memory cache with 5-minute TTL to reduce GitHub API rate limiting
- **Error Boundary** — Friendly error pages with retry and navigation options
- **Loading Skeletons** — Detailed skeleton UI matching every analytics section
- **Mobile Responsive** — Optimized layout for phones and tablets

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Runtime / Package Manager | Bun |
| Styling | Tailwind CSS |
| Fonts | JetBrains Mono, Outfit |
| Testing | Vitest |
| Data | GitHub Public API (no key required) |

## Getting Started

```bash
bun install
bun run dev
```

Open http://localhost:3000, enter a GitHub username, and scan.

## Testing

```bash
bun run test
```

Runs unit tests for utility functions and caching logic via Vitest.

## Project Structure

```
app/
├── page.tsx                    # Home — search bar
├── layout.tsx                  # Root layout with metadata
├── error.tsx                   # Global error boundary
├── globals.css                 # Animations, grid background
├── compare/
│   └── page.tsx                # Comparison mode page
└── user/[username]/
    ├── page.tsx                # Dynamic profile page (server-rendered)
    └── loading.tsx             # Loading skeleton
components/
├── SearchBar.tsx               # Username search input
├── ProfileHeader.tsx           # User info display
├── ActivityStats.tsx           # 6-stat grid
├── LanguageBreakdown.tsx       # Donut chart language visualization
├── RepoHighlights.tsx          # Top repos container
├── RepoCard.tsx                # Individual repo card
├── ContributionPatterns.tsx    # Weekly creation chart
├── CommitHeatmap.tsx           # Update activity heatmap
├── StarHistory.tsx             # Cumulative star chart
├── ContributorStats.tsx        # Language & freshness breakdown
├── CompareForm.tsx             # Profile comparison form
├── DateRangeFilter.tsx         # Date range filter controls
├── ExportButton.tsx            # CSV/JSON export
├── ErrorBoundary.tsx           # React error boundary component
└── UserProfile.tsx             # Main profile composition
lib/
├── github.ts                   # GitHub API client and utilities
└── cache.ts                    # In-memory response cache
__tests__/
├── github.test.ts              # Utility function tests
└── cache.test.ts               # Cache logic tests
```

## Deploy

No environment variables needed. Deploy to Vercel:

```bash
bun run build
```

## License

MIT
