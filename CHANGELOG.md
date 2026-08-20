# Changelog

## [1.2.0] - 2026-08-19

### Security
- Cap the in-memory API cache at 500 entries with oldest-entry eviction, closing an unbounded-growth vector from the June security audit; also use an optional `GITHUB_TOKEN` for API auth, surface rate-limit errors, and ignore all `.env` files except `.env.example` (#6)
- Add Dependabot version-update config (#7)
- Resolve all outstanding Dependabot security alerts (#15)

### Dependencies
- Upgrade React 19, Next 16, Tailwind 4, ESLint 10, @types/node 26 (#19)
- Bump GitHub Actions: oven-sh/setup-bun 1 → 2 (#9), actions/checkout 4 → 7 (#16)

### Housekeeping
- Add MIT license and repository metadata to package.json (#22)
- Add a screenshot to the README (#23)
- Add the live CI badge to the README
- Bump the package.json `version` field 0.1.0 → 1.2.0 — it was never bumped for the 1.0.0 or 1.1.0 releases, so it now catches up with reality

## [1.1.0] - 2026-03-16

### Added
- Date range filtering for repository analytics
- Export to CSV/JSON for analytics data
- Donut chart for language breakdown visualization
- Star history chart showing cumulative stars over time
- Commit activity heatmap for repository updates
- Comparison mode for side-by-side profile analysis
- Repository activity breakdown (language distribution, update freshness)
- In-memory API response caching with 5-minute TTL
- Error boundary with user-friendly messages and retry
- Detailed loading skeletons for all analytics sections
- Unit tests for utility functions and caching logic
- GitHub Actions CI workflow

### Improved
- Mobile responsive design across all components
- README with comprehensive feature documentation and project structure

## [1.0.0] - 2026-03-15

### Added
- Profile overview with avatar, bio, location, and account age
- Activity stats grid (repos, stars, forks, top language)
- Stacked bar language breakdown with top-5 legend
- Repository highlights sorted by stars
- Contribution patterns (day-of-week chart)
- Loading skeleton UI
- Error handling for unknown users
