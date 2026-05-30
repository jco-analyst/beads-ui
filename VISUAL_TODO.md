# beads-ui Visual Improvements

Visual changes to make this UI match the best parts of AvivK5498/beads-web
(Next.js + Rust Kanban, ~78 stars). We switched to mantoni/beads-ui because it
is more actively maintained and has a larger community (~625 stars), but Aviv's
UI had better visual design. These items port those visual ideas into this
vanilla JS / lit-html codebase.

---

## 1. Column header color-coding

**What Aviv had:** Each column has a colored top border + colored title text.
- Open → blue (`border-t-2 border-t-blue-500/60`, text `text-blue-400`)
- In Progress → amber
- In Review → cyan
- Closed → green

**What we have:** Plain `board-column__header` with no status color.

**Implementation:** Add a `data-status` attr on each `<section class="board-column">` in
`board.js` `columnTemplate()`, then CSS rules in `styles.css` targeting
`.board-column[data-status="open"]`, etc. with `border-top` and
`--column-title-color` custom property.

---

## 2. Color-coded status / type badges

**What Aviv had:** Status and type badges are color-coded (blue=open, amber=in_progress,
cyan=inreview, green=closed; bug=red, task=yellow, feature=blue, epic=purple).
The count badge in each column header uses the same palette.

**What we have:** Basic badge styling exists but limited palette.

**Implementation:** Extend the CSS custom properties in `styles.css`. The
`--badge-bg-*` and `--badge-fg-*` vars are already there for open/in_progress/closed —
add `inreview` (cyan), and flesh out type badge colors.

---

## 3. Custom status labels on cards

**What Aviv had:** Cards showed worktree/PR status ("Synced", "Ready to Merge",
"Checks Pending", "Needs Rebase") as colored badges. We decided NOT to use
worktree status — instead we want user-defined card labels / sub-statuses like:
- "In Review"
- "Missing Requirements"
- "Postponed"
- "Blocked on External"
- etc.

**Why:** The `status` field in beads is a fixed enum (open/in_progress/inreview/closed).
We want freeform annotation per card visible directly on the board without
opening the detail view.

**Implementation options:**
a) Use the `labels` field (beads already supports labels — `bd update <id> --label foo`).
   Render first label as a colored badge on the card. Cheap, no schema change.
b) Add a dedicated `sub_status` custom field. More structured but requires bd support.

**Recommended:** Option (a) — labels as badges. `IssueLite` in board.js needs a
`labels?: string[]` field, and the server's ws.js / list-adapters.js needs to
include it in the board payload. Then `cardTemplate()` renders the first label
as a badge with a hash-derived pastel color.

---

## 4. Description snippet on cards

**What Aviv had:** Cards showed a truncated first line of the description under
the title (`CardDescription` component, ~80 chars).

**What we have:** Cards only show title.

**Implementation:** Add `description?: string` to the `IssueLite` typedef and
include it in the board issue projection in `server/list-adapters.js`.
In `cardTemplate()` in `board.js` add a `<div class="board-card__desc">` that
renders `truncate(it.description, 80)` when present.

---

## 5. Progress bar for epics (child task completion)

**What Aviv had:** Epic cards showed a progress bar (`<Progress>` component)
indicating what % of child tasks are closed. E.g. "3/7 done → 43%".

**What we have:** No progress bar, no child awareness on cards.

**Implementation:** Requires two changes:
1. Server: when projecting board issues, include child count + closed child count
   for epics. In `server/bd.js` or `list-adapters.js`, call `bd list --parent=<id>`
   or use the existing issues snapshot to group by `parent_id`.
2. Client: in `cardTemplate()` (and ideally a separate `epicCardTemplate()`),
   render a `<progress>` element when `it.issue_type === 'epic'` and child counts
   are present.

---

## 6. Collapsible child task list on epic cards

**What Aviv had:** Epic cards had a toggle chevron showing/hiding a list of
child tasks inline on the card. Clicking a child navigated to that issue.

**What we have:** No child visibility on board cards.

**Implementation:** Extend the server projection (same as #5) to include
`children: Array<{ id, title, status }>` for epics. In `cardTemplate()`, add a
toggle button that shows a `<ul>` of child items. Use `lit-html` directives to
track toggle state per card. Each child row is a clickable link to `gotoIssue(child.id)`.

---

## Implementation order

1. Items 1–2 (column colors + badge palette) — CSS only, ~1 hour
2. Item 3 (labels as badges) — small server change + card template, ~2 hours
3. Item 4 (description on cards) — small server + template change, ~1 hour
4. Items 5–6 (epic progress + children) — needs server aggregation, ~3 hours

---

## Reference

- **mantoni/beads-ui board.js:** `app/views/board.js` — `columnTemplate()`, `cardTemplate()`
- **mantoni/beads-ui styles:** `app/styles.css` — CSS custom props, `.board-card`, `.board-column`
- **Aviv's column colors:** `src/components/kanban-column.tsx` in `/mnt/main/beads-kanban-ui` (DELETED — use this doc)
- **Aviv's epic card:** `src/components/epic-card.tsx` — Progress component, child toggle, `computeEpicProgress()`
- **Aviv's bead card:** `src/components/bead-card.tsx` — status badge logic, description truncation
- **beads labels field:** `bd update <id> --label <name>` — labels are a string array on each issue
