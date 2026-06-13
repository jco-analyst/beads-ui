# Project Instructions for AI Agents

Project-specific context that is **not** already injected at session start (beads prime, hindsight + bd memories). Keep this file lean — only facts that would otherwise be re-questioned every session.

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
`python3 .claude/hooks/reconcile-hooks.py`; `--check` to detect drift) to restore the canonical set.
Edit the `DESIRED` / `SUPERSEDED_MARKERS` tables in that script, not `settings.json` by hand.

## BMad workflow (project-specific) — beads IS the story

BMad 6.8.0 is installed but runs in a **modified, beads-backed** mode. Do **not** follow stock BMad's sprint-status path.

- **No `_bmad-output/sprint-status.yaml` and no story `.md` files** — `_bmad-output/` is empty by design. When a BMad skill (`bmad-dev-story`, `bmad-create-story`, etc.) tries to auto-discover a "ready-for-dev" story, **skip that discovery**: the **bead** (e.g. `bdui-321.1`) IS the story spec. Read it with `bd show <id>`.
- Track progress/completion on the bead via `bd update <id> --notes` and checkbox-equivalent updates — there is no story file to edit.
- `bmad-dev-story` ends at status **"review"**, not closed. Beads has no `review` status, so **leave the bead `in_progress` with completion notes** and recommend a code-review; the human closes it.
- Don't HALT hunting for sprint-status / story-markdown artifacts — they don't exist here.

## Knowledge vault (`beads-ui-knowledge/`)

`beads-ui-knowledge/` is this repo's own Obsidian vault for durable design/decision/research notes
— the markdown counterpart to beads (tasks) and hindsight (episodic memory). Use it for artifacts
worth keeping and cross-linking: ADRs, design notes, investigations, repo/tool docs.

**Search before you author or decide:** before creating a knowledge artifact or making a design
decision, tag-scan the vault frontmatter first — e.g. `grep -rl 'type/decision' beads-ui-knowledge/
--include='*.md'` (tag vocab: `type/<x>`, `status/<x>`, `domain/beads-ui`) — before a broad content
grep. A doc existing is not proof it's the current intended path; confirm against the spec/ADR first.

- **Structure:** numbered folders — `03-Repos/`, `04-Research/`, `05-Decisions/`, `06-Design/`,
  `07-Opportunities/`, `08-Diagrams/` — plus `Templates/`.
- **Creating an entry:** instantiate the matching `Templates/<type>.md` (Obsidian Templater fills
  date/title; from the CLI copy the template and fill frontmatter statically). Pick by intent:
  `decision` (ADR), `design`, `research`, `investigation`, `architecture`, `repository`/`repo-index`,
  `requirement`, `opportunity`, `capability`, `tool-doc`.
- **Tagging:** entries carry `domain/beads-ui`; link related notes with `[[wikilinks]]`.
- **Full vault system** (structure, frontmatter contract = the query layer, search protocol):
  `~/.claude/references/knowledge-vault-system.md`.
- **Not for:** task tracking (use beads / `bd`) or cross-session conversational recall (hindsight).
