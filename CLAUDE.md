# Project Instructions for AI Agents

Project-specific context that is **not** already injected at session start (beads prime, the tool-router PreToolUse nudge, hindsight + bd memories). Keep this file lean — only facts that would otherwise be re-questioned every session.

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

- **Structure:** numbered folders — `03-Repos/`, `04-Research/`, `05-Decisions/`, `06-Design/`,
  `07-Opportunities/`, `08-Diagrams/` — plus `Templates/`.
- **Creating an entry:** in Obsidian, instantiate the matching `Templates/<type>.md` (Templater
  fills date/title/prompts). From the CLI, copy the template and fill the frontmatter statically.
  Pick the template by intent: `decision` (ADR), `design`, `research`, `investigation`,
  `architecture`, `repository`/`repo-index`, `requirement`, `opportunity`, `capability`, `tool-doc`.
- **Tagging:** entries carry `domain/beads-ui`; link related notes with `[[wikilinks]]`.
- **Not for:** task tracking (use beads / `bd`) or cross-session conversational recall (hindsight).
