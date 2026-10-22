# Xiiiing — personal portal

[Personal homepage](https://xiiiing.github.io/) · [Wiki](https://xiiiing.github.io/wiki/)

Built with Astro Theme Pure, adapted into a static personal portal. The knowledge
base is maintained independently in [Xiiiing/wiki](https://github.com/Xiiiing/wiki).

## Development

Use Node.js 24 and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

`pnpm build` runs Astro's checks, creates the static site, generates legacy URL
redirects and validates the resulting pages. Pushing `main` deploys this repository
with GitHub Pages Actions. Wiki deployments are independent.

## Content

- Homepage: `src/pages/index.astro`
- Personal details: `src/pages/me/index.astro` (`/me/` avoids the legacy `/About/` path)
- Project directory: `src/pages/projects/index.astro`
- Curated notes: `src/data/notes.ts`
- Theme/navigation: `src/site.config.ts`, `src/styles/global.css`

`/wiki/`, `/ui/` and `/lab/` are reserved for independent project sites. UI and Lab
are marked as planned until their sites exist. The root site has no placeholder
routes at those paths.

## Legacy URLs and rollback

`migration/legacy-routes.json` inventories the previous published Wiki pages.
The build emits static redirect pages retaining query strings and fragments in
browsers with JavaScript enabled. These are HTML redirects, not HTTP 301 responses.
Previously linked images and PDFs are retained at their original paths. Old feed
URLs carry a subscription migration notice.

Wiki migration base: `fa720e921b2e6e26c04805f76367b9b164dfd081`.
The tag `before-portal-migration-20261022` preserves the pre-migration source.
To restore the former root site, manually run the `Restore Pre-migration Wiki`
workflow. It builds the saved tag and publishes through Pages Actions without
changing `main`. Re-run `Deploy Personal Site` to return to the portal. The
independent Wiki remains available during either root-site deployment.

Template attribution and licenses: see `THIRD_PARTY_NOTICES.md`.

