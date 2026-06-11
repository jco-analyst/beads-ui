#!/usr/bin/env python3
"""Reconcile this project's Claude Code hooks to a known-good canonical set.

WHY THIS EXISTS
---------------
Several tool installers write into `.claude/settings.json` `hooks`:
  - `graphify claude install` injects two inline PreToolUse "graphify nudge" hooks.
  - `bd init` / `bd setup claude` writes the `bd prime` SessionStart/PreCompact hooks.
Running any of them again (e.g. after a graphify upgrade) can re-add superseded hooks
or clobber our customizations. Rather than hand-reconciling after every installer run,
this script declares the DESIRED end state and enforces it idempotently.

It is:
  - **declarative** — DESIRED below is the single source of truth for this repo's hooks.
  - **idempotent** — running it twice makes no second change.
  - **additive-safe** — hooks it doesn't manage are left untouched.
  - **supersession-aware** — strips installer-injected hooks we've replaced (the inline
    graphify nudges, now handled by the single tool-router-nudge.sh).

USAGE
-----
  python3 .claude/hooks/reconcile-hooks.py            # apply
  python3 .claude/hooks/reconcile-hooks.py --check    # exit 1 if drift (no write); for CI/preflight

Run it after any installer that touches hooks (`graphify claude install`, `bd setup claude`).
Long-term goal: fold this declaration into the installers themselves so reconciliation
is unnecessary.
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parents[2]
SETTINGS = PROJECT_DIR / ".claude" / "settings.json"

# --- Desired canonical hooks -------------------------------------------------
# Each entry: event -> list of {matcher, command}. A hook is considered PRESENT
# if an existing entry on that event has the same matcher AND a hook whose
# command equals `command`. Missing ones are appended.
DESIRED = {
    "SessionStart": [{"matcher": "", "command": "bd prime"}],
    "PreCompact": [{"matcher": "", "command": "bd prime"}],
    "PreToolUse": [
        {
            "matcher": "Bash|Read|Glob|Grep",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/tool-router-nudge.sh",
        }
    ],
}

# --- Superseded hooks to strip ----------------------------------------------
# Any hook whose command contains one of these markers is removed: these are the
# inline graphify PreToolUse nudges that `graphify claude install` injects. The
# single tool-router-nudge.sh (graphify + Serena, fire-once) replaces both.
SUPERSEDED_MARKERS = [
    "graphify: knowledge graph at graphify-out/",
]

# Hook scripts that MUST exist + be executable for the desired set to work.
REQUIRED_SCRIPTS = [
    PROJECT_DIR / ".claude" / "hooks" / "tool-router-nudge.sh",
]


def load_settings() -> dict:
    if not SETTINGS.exists():
        return {}
    try:
        return json.loads(SETTINGS.read_text())
    except json.JSONDecodeError as e:
        print(f"✖ {SETTINGS} is not valid JSON: {e}", file=sys.stderr)
        sys.exit(2)


def command_of(hook: dict) -> str:
    return str(hook.get("command", ""))


def is_superseded(hook: dict) -> bool:
    cmd = command_of(hook)
    return any(marker in cmd for marker in SUPERSEDED_MARKERS)


def reconcile(settings: dict) -> tuple[dict, list[str]]:
    """Return (new_settings, actions). Pure — does not write."""
    actions: list[str] = []
    hooks = dict(settings.get("hooks", {}))

    for event, desired_entries in DESIRED.items():
        entries = [dict(e) for e in hooks.get(event, [])]

        # 1. Strip superseded hooks on this event.
        for entry in entries:
            kept = [h for h in entry.get("hooks", []) if not is_superseded(h)]
            if len(kept) != len(entry.get("hooks", [])):
                actions.append(
                    f"strip superseded hook(s) on {event} (matcher={entry.get('matcher', '')!r})"
                )
            entry["hooks"] = kept
        # Drop now-empty entries.
        entries = [e for e in entries if e.get("hooks")]

        # 2. Ensure each desired hook is present.
        for d in desired_entries:
            matcher, command = d["matcher"], d["command"]
            match_entry = next(
                (e for e in entries if e.get("matcher", "") == matcher), None
            )
            if match_entry is None:
                entries.append(
                    {
                        "matcher": matcher,
                        "hooks": [{"type": "command", "command": command}],
                    }
                )
                actions.append(f"add {event} hook (matcher={matcher!r}) -> {command}")
            elif not any(command_of(h) == command for h in match_entry["hooks"]):
                match_entry["hooks"].append({"type": "command", "command": command})
                actions.append(
                    f"add {event} command on existing matcher {matcher!r} -> {command}"
                )

        hooks[event] = entries

    new_settings = dict(settings)
    new_settings["hooks"] = hooks
    return new_settings, actions


def check_scripts() -> list[str]:
    problems = []
    for s in REQUIRED_SCRIPTS:
        if not s.exists():
            problems.append(f"missing required hook script: {s}")
        elif not os.access(s, os.X_OK):
            problems.append(f"hook script not executable (chmod +x): {s}")
    return problems


def main() -> int:
    check_only = "--check" in sys.argv
    settings = load_settings()
    new_settings, actions = reconcile(settings)
    script_problems = check_scripts()

    if check_only:
        if actions or script_problems:
            for a in actions:
                print(f"DRIFT: {a}")
            for p in script_problems:
                print(f"PROBLEM: {p}")
            return 1
        print("✓ hooks already reconciled, scripts present")
        return 0

    for p in script_problems:
        print(f"⚠ {p}", file=sys.stderr)

    if not actions:
        print("✓ hooks already reconciled — no changes")
        return 0

    SETTINGS.write_text(json.dumps(new_settings, indent=2) + "\n")
    print(f"✓ reconciled {SETTINGS.relative_to(PROJECT_DIR)}:")
    for a in actions:
        print(f"  - {a}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
