---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: capability
status: active
priority: <%tp.system.suggester(['1 - Critical', '2 - High', '3 - Medium', '4 - Low', '5 - Nice to Have'], ['1', '2', '3', '4', '5'])%>
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/capability, status/active, domain/beads-ui]
---

# <%tp.file.title%>

## Overview

<!-- One-paragraph description of this capability and why it matters for Horde -->

## Requirements

<!-- Link to all requirements that belong to this capability -->

| Requirement | Status | Candidates |
|-------------|--------|------------|
| [[REQ-Example]] | red | 0 |

## Status Summary

```dataview
TABLE status, file.outlinks as "Candidates"
FROM [[<%tp.file.title%>]]
WHERE type = "requirement"
SORT status ASC
```

## Architecture Notes

<!-- High-level architectural considerations for this capability -->

## Related Capabilities

<!-- Links to capabilities that interact with this one -->

## Open Questions

<!-- Unresolved decisions or areas needing research -->
