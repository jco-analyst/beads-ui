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

## Architecture Overview

Pure Node.js + vanilla-JS kanban UI for the beads (`bd`) issue tracker — no framework, no build step for the server.

- `app/` — frontend SPA: lit-html templates + plain JS. Key files: `app/views/board.js` (`columnTemplate()`, `cardTemplate()`), `app/styles.css` (CSS custom props for badge/column colors). Bundled to `app/main.bundle.js`.
- `server/` — Node HTTP + WebSocket server. Reads beads data by shelling out to `bd` (`server/bd.js`), projects it for the board (`server/list-adapters.js`), and pushes live updates over WS (`server/ws.js`).
- `bin/` — CLI entry (`bdui`).
- `scripts/` — frontend build/watch.
- `test/` — vitest unit tests.

## Conventions & Patterns

Coding conventions for this vanilla-JS / lit-html codebase:

- **Modules:** ECMAScript modules everywhere. `.js` for runtime (with JSDoc `@param`/`@import` types), `.ts` only for pure type/interface definitions (no runtime side effects).
- **Naming:** `PascalCase` classes/interfaces · `camelCase` functions/methods (and callable-valued vars) · `lower_snake_case` variables/params · `UPPER_SNAKE_CASE` constants · `kebab-case` files/dirs.
- **JSDoc:** annotate all functions; declare every `@param`; add `@returns` only when the return type isn't self-evident. Add `@type` for ambiguous or empty-collection (`{}`/`[]`/`new Map()`) locals.
- **Control flow:** always brace bodies. Use `?.`/`??` only for intentionally-nullable values — prefer explicit narrowing.

## Beads (project-specific config)

This repo tracks its own dev work in beads under the **`bdui-`** prefix.

- **Mode:** external server (shared horde Dolt on `127.0.0.1:3307`, database `bdui`). The server is managed by systemd — **do NOT run `bd dolt start`/`stop`**.
- General `bd` workflow + session-close protocol is injected by `bd prime` (see the Beads Issue Tracker section above); don't duplicate it here.

## BMad workflow (project-specific) — beads IS the story

BMad 6.8.0 is installed but runs in a **modified, beads-backed** mode. Do **not** follow stock BMad's sprint-status path.

- **No `_bmad-output/sprint-status.yaml` and no story `.md` files** — `_bmad-output/` is empty by design. When a BMad skill (`bmad-dev-story`, `bmad-create-story`, etc.) tries to auto-discover a "ready-for-dev" story, **skip that discovery**: the **bead** (e.g. `bdui-321.1`) IS the story spec. Read it with `bd show <id>`.
- Track progress/completion on the bead via `bd update <id> --notes` and checkbox-equivalent updates — there is no story file to edit.
- `bmad-dev-story` ends at status **"review"**, not closed. Beads has no `review` status, so **leave the bead `in_progress` with completion notes** and recommend a code-review; the human closes it.
- Don't HALT hunting for sprint-status / story-markdown artifacts — they don't exist here.

## Code understanding — tool router

Three complementary tools for understanding code. Pick the lens (check in this order):

- **graphify** (when `graphify-out/graph.json` exists) — ORIENT: where things live, how they
  relate, blast radius. `graphify query "<q>"` (scoped subgraph), `graphify explain "<symbol>"`
  (a node + its typed neighbours), `graphify path "<A>" "<B>"`, `graphify affected "<X>"`. Returns
  pointers (`file:Ln`) + relations, **not source bodies**; trust `[EXTRACTED]` (AST) edges over
  `[INFERRED]` (LLM-guessed). Snapshot is commit-fresh via the post-commit hook (in `.beads/hooks/`).
  After changing code, `graphify update .` (AST-only, no API cost). `graphify-out/GRAPH_REPORT.md` /
  `wiki/index.md` only for broad architecture review.
- **Serena** — PRECISION: read a specific symbol body, find references, make symbol-aware edits.
  `get_symbols_overview`, `find_symbol`, `find_referencing_symbols`, `replace_symbol_body`, etc.
  Verify anything graphify suggested here before acting on it. (Project registered as `beads-ui`.)
- **Read / grep** — non-code files, or when neither graph nor Serena has the detail.

Rule: **graphify to find & frame → Serena to read & change.** Don't dump whole files when a symbol
read or a graph query answers it. (A one-shot PreToolUse nudge fires once per session if a raw
grep/read reaches past these.)

**Hooks are reconciled, not hand-managed.** This repo's canonical CC hook set (`bd prime` on
SessionStart/PreCompact + the single `tool-router-nudge.sh` on PreToolUse) is declared in
`.claude/hooks/reconcile-hooks.py`. Installers (`graphify claude install`, `bd setup claude`) can
re-inject superseded hooks — after running any of them, run `npm run hooks:reconcile` (or
`npm run hooks:check` to detect drift) to restore the canonical set. Edit the `DESIRED` /
`SUPERSEDED_MARKERS` tables in that script, not `settings.json` by hand.

## Knowledge vault (`beads-ui-knowledge/`)

`beads-ui-knowledge/` is this repo's own Obsidian vault for durable design/decision/research notes
— the markdown counterpart to beads (tasks) and hindsight (episodic memory). Use it for artifacts
worth keeping and cross-linking: ADRs, design notes, investigations, repo/tool docs.

- **Structure:** numbered folders — `03-Repos/`, `04-Research/`, `05-Decisions/`, `06-Design/`,
  `07-Opportunities/`, `08-Diagrams/` — plus `Templates/`.
- **Creating an entry:** in Obsidian, instantiate the matching `Templates/<type>.md` (Templater
  fills date/title/prompts). From the CLI, copy the template and fill the frontmatter statically.
  Pick the template by intent: `decision` (ADR), `design`, `research`, `investigation`,
  `architecture`, `repository`/`repo-index`, `requirement`, `opportunity`, `capability`, `tool-doc`.
- **Tagging:** entries carry `domain/beads-ui`; link related notes with `[[wikilinks]]`.
- **Not for:** task tracking (use beads / `bd`) or cross-session conversational recall (hindsight).
