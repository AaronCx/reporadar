# RepoRadar

Scan any public GitHub profile and get an instant visual developer profile with analytics, language breakdowns, and contribution patterns.

**[Try it live](https://reporadar-rho.vercel.app)**

## Features

- **Profile Overview** — Avatar, bio, location, followers/following, account age
- **Activity Stats** — Public repos, total stars, total forks, most-used language, most-starred repo
- **Language Breakdown** — Stacked percentage bar with top 5 languages color-coded
- **Repository Highlights** — Top 6 repos sorted by stars, showing language, stars, forks, and last update
- **Contribution Patterns** — Bar chart of which days of the week repos are created most
- **Loading Skeleton** — Smooth skeleton UI while data loads
- **Error Handling** — Friendly 404 for unknown users with recovery link

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | JetBrains Mono, Outfit |
| Data | GitHub Public API (no key required) |

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000, enter a GitHub username, and scan.

## Project Structure

```
app/
├── page.tsx                    # Home — search bar
├── layout.tsx                  # Root layout with metadata
├── globals.css                 # Animations, grid background
└── user/[username]/
    ├── page.tsx                # Dynamic profile page (server-rendered)
    └── loading.tsx             # Loading skeleton
components/
├── SearchBar.tsx               # Username search input
├── ProfileHeader.tsx           # User info display
├── ActivityStats.tsx           # 6-stat grid
├── LanguageBreakdown.tsx       # Language visualization
├── RepoHighlights.tsx          # Top repos container
├── RepoCard.tsx                # Individual repo card
└── ContributionPatterns.tsx    # Weekly creation chart
lib/
└── github.ts                   # GitHub API client and utilities
```

## Deploy

No environment variables needed. Deploy to Vercel:

```bash
npm run build
```

## License

MIT
