# Scream2Wish — Website

The public wishes board for [Scream2Wish](https://github.com/RajnishKMehta/Scream2Wish). Displays all wishes and notes submitted through the Android app.

Live at: **[rajnishkmehta.github.io/Scream2Wish](https://rajnishkmehta.github.io/Scream2Wish)**

Built with vanilla TypeScript + Vite, hosted on GitHub Pages.

## Local Dev

```bash
pnpm install
pnpm dev
```

Runs at `http://localhost:5173/Scream2Wish`.

## Build

```bash
pnpm build
```

Output goes to `dist/`. GitHub Actions deploys it automatically on push to `main`.

## Structure

```
src/
  config.ts          — app-wide URLs, author info, links
  pages/
    home.ts          — wishes board (fetches + renders all wishes)
    about.ts         — about page and how-it-works steps
    wish.ts          — individual wish detail view
  components/
    navbar.ts        — top navigation
    creator.ts       — creator card / footer section
  lib/
    fetchWishes.ts   — fetch helpers for Scream2Wish-wishes JSON API
  styles/
    global.css        — all styles
```

## Data Source

Wishes are fetched directly from the `Scream2Wish-wishes` GitHub repo at runtime:

```
https://raw.githubusercontent.com/RajnishKMehta/Scream2Wish-wishes/main/wishes/index.json
https://raw.githubusercontent.com/RajnishKMehta/Scream2Wish-wishes/main/wishes/{id}.json
```

No backend required — the GitHub repo is the database.