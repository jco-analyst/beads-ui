---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: repository
category: "03-Repos"
status: active
source_dep: "dep/<%tp.file.title.toLowerCase()%>/"
version_tracked: "<%tp.system.prompt('Version tracked (e.g., v0.56.1)')%>"
last_verified: <%tp.date.now('YYYY-MM-DD')%>
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/repository, topic/<%tp.file.title.toLowerCase()%>, domain/beads-ui]
---

> MOC: [[Home]]

# <%tp.file.title%>

**One-line description.**

| Field | Value |
|-------|-------|
| Source | `dep/<%tp.file.title.toLowerCase()%>/` |
| Version tracked | <!-- e.g., v0.56.1 --> |
| Last verified | <%tp.date.now('YYYY-MM-DD')%> |

## File Map

| File | Freshness | Updated | Role |
|------|-----------|---------|------|
| [[<%tp.file.title.toLowerCase()%>-reference]] | <!-- current/stale/historical --> | <!-- date --> | Agent reference (READ THIS) |
| [[<%tp.file.title.toLowerCase()%>-analysis]] | <!-- current/stale/historical --> | <!-- date --> | Forensic analysis |
| [[<%tp.file.title.toLowerCase()%>-architecture]] | <!-- current/stale/historical --> | <!-- date --> | Architecture overview |

## Cross-Repo Research

<!-- Links to 04-Research/ files that reference this repo -->

## MVP Notes

<!-- What about this repo matters for MVP, what can be deferred -->
