---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: design
category: "08-Designs"
status: <%tp.system.suggester(['draft', 'active', 'implemented', 'superseded'], ['draft', 'active', 'implemented', 'superseded'])%>
story: "<%tp.system.prompt('Story reference (e.g., Story 1.1)')%>"
source: ""
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/design, status/<%tp.system.suggester(['draft', 'active', 'implemented', 'superseded'], ['draft', 'active', 'implemented', 'superseded'])%>, story/<%tp.system.prompt('Story number (e.g., 1-1)')%>, domain/beads-ui]
---

# <%tp.file.title%>

> MOC: [[Home]]

**Status**: <%tp.system.suggester(['Draft', 'Active', 'Implemented', 'Superseded'], ['Draft', 'Active', 'Implemented', 'Superseded'])%>
**Story**: <%tp.system.prompt('Story reference')%>
**Date**: <%tp.date.now('YYYY-MM-DD')%>

## Context

<!-- What problem does this design solve? What story/requirement drives it? -->

## Design

<!-- The actual design — architecture, components, data flow -->

## Implementation Plan

<!-- Step-by-step plan for building this -->

1.

## Open Questions

<!-- Unresolved decisions or unknowns -->

## Dependencies

<!-- Link to related requirements, capabilities, investigations -->
- [[]]

## Related

```dataview
TABLE status, story, created
FROM "08-Designs"
WHERE file.name != this.file.name
SORT created DESC
LIMIT 5
```
