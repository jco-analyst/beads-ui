---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: research
category: "10-Research"
status: <%tp.system.suggester(['active', 'complete', 'archived'], ['active', 'complete', 'archived'])%>
source: ""
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/research, status/<%tp.system.suggester(['active', 'complete', 'archived'], ['active', 'complete', 'archived'])%>, topic/<%tp.system.prompt('Topic tag')%>, domain/beads-ui]
---

# <%tp.file.title%>

> MOC: [[Home]]

**Status**: <%tp.system.suggester(['Active', 'Complete', 'Archived'], ['Active', 'Complete', 'Archived'])%>
**Date**: <%tp.date.now('YYYY-MM-DD')%>

## Background

<!-- One-paragraph: why is this research needed? What question are we answering? -->

## Findings

<!-- What was discovered — data, comparisons, analysis -->

## Implications

<!-- How do these findings affect Horde's design or implementation? -->

## References

<!-- Links, documentation, external sources consulted -->

## Dependencies

<!-- Link to related requirements, capabilities, designs this informs -->
- [[]]

## Related

```dataview
TABLE status, created
FROM "10-Research"
WHERE file.name != this.file.name
SORT created DESC
LIMIT 5
```
