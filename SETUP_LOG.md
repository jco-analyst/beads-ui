# Setup Log — beads-ui at /mnt/main/beads-ui

## 2026-05-28 — Initial setup

### What we did
- Replaced two old beads Kanban UIs with mantoni/beads-ui (625 stars, actively maintained, last release v0.12.0 Apr 2026)
- Pulled latest (`v0.12.0`), ran `npm install`, built frontend bundle
- Created systemd user service `beads-ui.service` (port 3007, WorkingDirectory=/mnt/main/horde)
- Updated `gamemode` / `workmode` aliases in `~/dotfiles/zsh/.zshrc` to use `beads-ui.service`
- Removed `/mnt/main/beads-web` and `/mnt/main/beads-kanban-ui` (both were forks of AvivK5498/beads-web, ~78 stars, less active)

### Why we switched
The old UI (AvivK5498/beads-web) was a Next.js + Rust app we had to build and run ourselves with a custom Rust binary. mantoni/beads-ui is pure Node.js, installable via `npx`, has 8x more stars, and is actively released. We kept visual improvement notes in `VISUAL_TODO.md`.

### Services removed
- `beads-kanban-ui.service` (was at `/mnt/main/beads-kanban-ui`, disabled)
- `beads-web.service` (was at `/mnt/main/beads-web`, port 4005, disabled)

### Current state
- Service: `systemctl --user status beads-ui.service`
- URL: http://127.0.0.1:3007
- Runbook: `~/.claude/runbooks/beads-kanban-ui.md` (needs updating — still references old paths)
