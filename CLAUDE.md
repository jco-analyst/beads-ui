# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->


## Build & Test

ESM Node project (`"type": "module"`). Runtime code is `.js` with JSDoc types; `.ts` files hold type/interface definitions only.

```bash
npm start              # run server (server/index.js --debug)
npm run build          # bundle frontend (scripts/build-frontend.js → app/main.bundle.js)
npm run watch          # rebuild frontend on change
npm test               # vitest run
npm run tsc            # type-check (tsc --noEmit) — JSDoc-driven
npm run lint           # eslint
npm run prettier:write # format
npm run all            # full gate: lint && tsc && test && prettier:check
```

**Pre-handoff validation:** run `npm run all` (or the individual gates) before considering work done. Never touch `CHANGES.md` (release-managed).

## Architecture Overview

Pure Node.js + vanilla-JS kanban UI for the beads (`bd`) issue tracker — no framework, no build step for the server.

- `app/` — frontend SPA: lit-html templates + plain JS. Key files: `app/views/board.js` (`columnTemplate()`, `cardTemplate()`), `app/styles.css` (CSS custom props for badge/column colors). Bundled to `app/main.bundle.js`.
- `server/` — Node HTTP + WebSocket server. Reads beads data by shelling out to `bd` (`server/bd.js`), projects it for the board (`server/list-adapters.js`), and pushes live updates over WS (`server/ws.js`).
- `bin/` — CLI entry (`bdui`).
- `scripts/` — frontend build/watch.
- `test/` — vitest unit tests.

## Conventions & Patterns

**`AGENTS.md` is the authoritative coding/testing standards doc** — Claude Code does not read `AGENTS.md` automatically, so the essentials are mirrored here; consult `AGENTS.md` for the full detail.

- **Modules:** ECMAScript modules everywhere. `.js` for runtime (with JSDoc `@param`/`@import` types), `.ts` only for pure type/interface definitions (no runtime side effects).
- **Naming:** `PascalCase` classes/interfaces · `camelCase` functions/methods (and callable-valued vars) · `lower_snake_case` variables/params · `UPPER_SNAKE_CASE` constants · `kebab-case` files/dirs.
- **JSDoc:** annotate all functions; declare every `@param`; add `@returns` only when the return type isn't self-evident. Add `@type` for ambiguous or empty-collection (`{}`/`[]`/`new Map()`) locals.
- **Control flow:** always brace bodies. Use `?.`/`??` only for intentionally-nullable values — prefer explicit narrowing.
- **Tests:** one behavior per test; active-verb names (`returns correct value`, `throws on invalid input`) — never start with "should". Structure as setup → execution → assertion, blank-line separated. Fix the code or the test, never bend the implementation just to pass.

## Beads (project-specific config)

This repo tracks its own dev work in beads under the **`bdui-`** prefix.

- **Mode:** external server (shared horde Dolt on `127.0.0.1:3307`, database `bdui`). The server is managed by systemd — **do NOT run `bd dolt start`/`stop`**.
- General `bd` workflow + session-close protocol is injected by `bd prime` (see the Beads Issue Tracker section above); don't duplicate it here.
