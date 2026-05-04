# kernelfusion.dev

## Goal

Public hub for the kernel-fusion research line — two published preprints, one
npm SDK, live demos, and cross-links to every applied project
(`webgpudna.com`, `gpubench.dev`, `zerotvm.com`, `neuropulse.live`). The site
is the first click in the funnel: papers → benchmarks → applied projects.

## Architecture

Next.js 16 with App Router, static-exported to Cloudflare Pages
(`output: "export"` in `next.config.ts`). Single `src/app/page.tsx` renders
the whole landing page; `src/app/why/page.tsx` and `privacy/` are secondary
routes.

- `src/app/page.tsx` — hero, research cards, demos, Applied section (driven
  by `SITES` and `CROSSLINKS` from `src/lib/sites.ts`), author bio, footer.
- `src/app/layout.tsx` — metadata, JSON-LD with `sameAs` (from `SAME_AS`).
- `src/lib/constants.ts` — project-specific links (DOIs, repos). Re-exports
  shared data from `src/lib/sites.ts`.
- `src/lib/sites.ts` — synced from `~/sites-shared/sites.ts`. **Never edit
  in place** — edit the source and run `node ~/sites-shared/sync.mjs`.
- `src/components/live-results.tsx` — fetches and renders live gpubench
  results inline in the homepage.

### Applied section convention

`CROSSLINKS.kernelfusion[0]` is the flagship (currently `webgpudna`), rendered
as a hero card with the 4-stat grid. The remaining three render as a 3-col
grid via `CATEGORY_BADGE` static class-string map (Tailwind JIT doesn't
extract `text-${color}` dynamic strings).

## Commands

```bash
npm install
npm run dev          # Next dev server at localhost:3000
npm run build        # Static export → out/
npm run typecheck    # tsc --noEmit
npm run lint         # eslint src/
npm run check        # typecheck + lint
```

Deploy: `node ~/sites-shared/deploy.mjs kernelfusion` (CF Pages, project
`kernelfusion`).

## Cross-site context

`src/lib/sites.ts` is synced from `~/sites-shared/sites.ts`. Edit URLs,
taglines, and `sameAs` there — never in place.

## Known gaps

- `src/lib/shader-gen.js` has two pre-existing unused-variable lint errors
  (`elemsPerThread`, `ffnElemsPerThread`) that fail `npm run lint`. The file
  is not wired into the page render — leftover from an earlier demo.
