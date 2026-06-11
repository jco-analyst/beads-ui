#!/usr/bin/env python3
"""PreToolUse nudge: fires ONCE per session if a raw grep/find/read reaches for
code while a graphify graph exists — pointing back to the CLAUDE.md tool router
(graphify to orient, Serena for precision). Combines serena-remind's fire-once
behavior with graphify's grep/read matchers. Silent unless it's genuinely a
"wrong tool" reach. Never blocks the tool call."""
import json
import os
import re
import sys

try:
    d = json.load(sys.stdin)
except Exception:
    sys.exit(0)

# Only nudge where a graph actually exists (cwd-scoped, like the graphify hooks).
if not os.path.exists("graphify-out/graph.json"):
    sys.exit(0)

tool = d.get("tool_name", "")
ti = d.get("tool_input", {}) or {}
sid = d.get("session_id") or "nosession"
marker = f"/tmp/tool-router-nudge-{sid}"

# Fire at most once per session.
if os.path.exists(marker):
    sys.exit(0)

wrong = False
if tool == "Bash":
    cmd = str(ti.get("command", "")).lower()
    if re.search(r"\b(grep|rg|ripgrep|find|fd|ack|ag)\b", cmd):
        wrong = True
elif tool in ("Read", "Glob", "Grep"):
    s = (
        str(ti.get("file_path") or "")
        + " " + str(ti.get("pattern") or "")
        + " " + str(ti.get("path") or "")
    ).lower().replace("\\", "/")
    # Code only — markdown/docs reads are not a "wrong tool" reach (KB is markdown).
    exts = (".py", ".js", ".ts", ".tsx", ".jsx", ".go", ".rs", ".java", ".rb",
            ".c", ".h", ".cpp", ".hpp", ".cc", ".cs", ".kt", ".swift", ".php",
            ".scala", ".lua", ".sh")
    if "graphify-out/" not in s and any(e in s for e in exts):
        wrong = True

if not wrong:
    sys.exit(0)

try:
    open(marker, "w").close()
except Exception:
    pass

msg = (
    "Tool router (shown once this session): this repo has graphify-out/ + Serena. "
    "Prefer `graphify query|explain|path|affected` to ORIENT (where / how-related / blast radius) "
    "and Serena find_symbol / find_referencing_symbols to read precise symbols and edit — over raw "
    "grep/read of code. Use raw read/grep for non-code or when neither has the detail. "
    "Full router: ./CLAUDE.md (## Code understanding)."
)
print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "additionalContext": msg}}))
sys.exit(0)
