---
id: "202606112140"
title: "Migrate beads-ui frontend to React 19 + Vite + Tailwind v4 + shadcn (Base UI)"
aliases: ["ADR-0001"]
summary: "Adopt the KPMG-wellness frontend stack (React/Vite/Tailwind v4/shadcn-Base-UI) for beads-ui, keeping the existing Node HTTP+WS backend; migrate incrementally (strangler)."
type: decision
status: accepted
date: 2026-06-11
created: 2026-06-11
tags: [type/decision, status/accepted, domain/beads-ui]
---

# ADR-0001: Migrate beads-ui frontend to React 19 + Vite + Tailwind v4 + shadcn (Base UI)

**Status**: Accepted
**Date**: 2026-06-11

## Context

beads-ui's frontend is currently **vanilla JS + lit-html**, bundled by a hand-rolled
esbuild script (`scripts/build-frontend.js` → `app/main.bundle.js`). The backend is a
**Node HTTP + WebSocket server that shells out to the `bd` CLI** (`server/`), projecting
beads data for the board and pushing live updates over WS. There is **no Firebase**.

We want UI parity with our reference app — the **KPMG Work-wellness** app
(`/mnt/main/Work-wellness`, `jco-analyst/Work-wellness`) — whose stack was verified
against its `package.json`, `vite.config.ts`, `components.json`, `src/index.css`,
`src/lib/utils.ts`, and authored `.claude/rules/`. See **Evidence** below.

The pending visual-design epic (beads `bdui-c2z`: status/type/priority color-coding,
card/column polish) is a poor fit to keep building in lit-html if we intend to move to
React+shadcn — those colors should land as Tailwind `@theme` tokens + shadcn `Badge`
variants. So the stack migration is sequenced **first**, and `bdui-c2z` re-lands on top.

## Decision

Adopt the wellness **frontend stack and tooling only**, and migrate **incrementally**.

1. **Frontend-only adoption — keep Node/WS, drop Firebase.** beads-ui keeps `server/`
   and the WebSocket transport. TanStack Query wraps that transport instead of Firestore.
   No Firebase Auth/Firestore/Functions are introduced.
2. **Incremental strangler migration.** Stand up React+shadcn alongside the existing
   `app/`, migrate view-by-view (board → column → card), keep the app working throughout.
   No big-bang rewrite.
3. **Match the wellness primitive layer exactly: Base UI.** Use shadcn style `base-vega`
   → **Base UI React** primitives (the `render`-prop pattern, **not** Radix `asChild`),
   so the wellness `.claude/rules/frontend/base-ui-patterns.md` conventions transfer.

### Target stack (verified from Work-wellness)

| Layer | Choice |
|---|---|
| Framework | React 19.2 + React Compiler (`babel-plugin-react-compiler`) |
| Language | TypeScript 5.9 · named exports only · no `any` |
| Build | Vite 7 (`@vitejs/plugin-react`), `@` → `/src` alias |
| Styling | Tailwind v4 CSS-first (`@import "tailwindcss"`, `@plugin`, `@theme` oklch tokens, `@custom-variant dark`); legacy `tailwind.config.js` only for extend (colors/fonts) |
| Components | shadcn/ui v3 style `base-vega` → Base UI primitives; `cn() = twMerge(clsx())`; `components.json` with `@/` aliases + `@magicui`/`@aceternity` registries |
| Icons | lucide-react |
| Data/state | TanStack Query **only** (never `useEffect` for fetching) + React Context |
| Forms | react-hook-form + `@hookform/resolvers` (where needed) |
| Install flow | shadcn MCP (`.mcp.json`) + `npx shadcn@latest add <c>` / `@magicui/...` |
| Structure | feature-first: `src/features/*`, `src/components/{ui,layout,animations}`, `src/lib`, `src/hooks`, `src/contexts` |
| Testing | Vitest + @testing-library/react + jsdom (`src/test/setup.ts`) |

**Setup ordering to replicate:** Vite+React+TS → Tailwind v4 via `@tailwindcss/vite` +
CSS-first `@theme` → `shadcn init` (style base-vega, neutral, cssVariables, `@/` aliases,
magicui/aceternity registries) → `cn` util → install base components → Base UI `render`
prop for custom triggers.

## Rationale

- **Parity & reuse:** identical stack lets us reuse the wellness `.claude/rules/`
  (base-ui-patterns, react-patterns, design-system, shadcn-testing) and component code.
- **Keep what works:** beads-ui's `bd`-shelling Node/WS backend is the right data source
  for a local issue tracker; Firebase would be a wrong, heavy detour.
- **Strangler de-risks:** the board keeps working while we migrate; PRs stay reviewable.
- **Base UI over Radix:** matches wellness exactly; avoids maintaining two primitive idioms.

## Consequences

### Positive
- One frontend idiom across both repos; shared rules/components.
- `bdui-c2z` color work becomes Tailwind `@theme` tokens + `Badge` variants (cleaner).
- Modern DX: Vite HMR, React Compiler, typed components.

### Negative / risks
- Dual toolchain during strangler (lit-html bundle + Vite) until migration completes.
- `bin/bdui` + server static-serving must switch from `app/main.bundle.js` to Vite `dist`.
- ESLint/tsconfig/prettier must cover both JS-JSDoc and TSX during transition.
- Base UI is younger than Radix — fewer third-party components; rely on shadcn/magicui/aceternity.

## Evidence (verified, not assumed)
- `/mnt/main/Work-wellness/package.json` — React 19.2, Vite 7, Tailwind 4.1, Base UI, CVA, TanStack Query, react-hook-form, vitest+RTL.
- `vite.config.ts` — `@vitejs/plugin-react` + `babel-plugin-react-compiler`, `@tailwindcss/vite`, `@`→`/src`, vitest jsdom.
- `components.json` — `style: base-vega`, baseColor neutral, cssVariables, lucide, `@/` aliases, `@magicui`/`@aceternity` registries.
- `src/index.css` — `@import "tailwindcss"`, `@plugin "tailwindcss-animate"`, `@theme` oklch tokens, `@custom-variant dark`.
- `src/lib/utils.ts` — `cn = twMerge(clsx(...))`.
- `.claude/rules/frontend/base-ui-patterns.md` — Base UI `render` prop vs Radix `asChild`.
- `.claude/rules/tooling/mcp-workflows.md` + `.mcp.json` — shadcn MCP install workflow.
- `.claude/rules/general/design-system.md` — tokens, typography (Outfit/Playfair), radius scale, glass utils.

## Related
- beads epic (migration prep): see beads `bdui-` migration epic.
- Downstream: `bdui-c2z` (visual design) re-lands on this stack.
