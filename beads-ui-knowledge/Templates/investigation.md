---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: investigation
category: "07-Investigations"
status: <%tp.system.suggester(['active', 'complete', 'archived'], ['active', 'complete', 'archived'])%>
source: ""
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/investigation, status/<%tp.system.suggester(['active', 'complete', 'archived'], ['active', 'complete', 'archived'])%>, topic/<%tp.system.prompt('Topic tag (e.g., agent-farm, beads)')%>, domain/beads-ui]
---

# <%tp.file.title%>

> MOC: [[Home]]

**Status**: <%tp.system.suggester(['Active', 'Complete', 'Archived'], ['Active', 'Complete', 'Archived'])%>
**Date**: <%tp.date.now('YYYY-MM-DD')%>

## Summary

<!-- One-paragraph overview: what was investigated and why -->

## Key Findings

<!-- Numbered list of significant discoveries -->

1.

## Relevant Code

<!-- Code paths, patterns, or snippets discovered -->

| Repository | Path | Relevance |
|------------|------|-----------|
| | | |

## Recommendations

<!-- What should be done with these findings? -->

## Dependencies

<!-- Link to related notes — no note should be an orphan -->
- [[]]

## Related

```dataview
TABLE status, created
FROM "07-Investigations"
WHERE file.name != this.file.name
SORT created DESC
LIMIT 5
```
