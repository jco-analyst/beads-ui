---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: ["ADR-<%tp.system.prompt('ADR Number')%>"]
summary: "One-line description of this file's content"
type: decision
status: <%tp.system.suggester(['proposed', 'accepted', 'deprecated', 'superseded'], ['proposed', 'accepted', 'deprecated', 'superseded'])%>
requirement: "[[<%tp.system.prompt('Related requirement')%>]]"
date: <%tp.date.now('YYYY-MM-DD')%>
created: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/decision, status/<%tp.system.suggester(['proposed', 'accepted', 'deprecated', 'superseded'], ['proposed', 'accepted', 'deprecated', 'superseded'])%>, domain/beads-ui]
---

# ADR-<%tp.system.prompt('ADR Number')%>: <%tp.file.title%>

**Status**: <%tp.system.suggester(['Proposed', 'Accepted', 'Deprecated', 'Superseded'], ['Proposed', 'Accepted', 'Deprecated', 'Superseded'])%>
**Date**: <%tp.date.now('YYYY-MM-DD')%>
**Requirement**: [[<%tp.system.prompt('Related requirement')%>]]

## Context

<!-- What is the issue we're addressing? What forces are at play? -->

## Decision

<!-- What is the change we're making? Which candidate did we select? -->

**Selected**: [[<%tp.system.prompt('Selected candidate')%>]]

## Rationale

<!-- Why did we choose this option over others? -->

## Consequences

### Positive
-

### Negative
-

### Risks
-

## Trade-offs

<!-- What are we giving up? What are we gaining? -->

## Alternatives Considered

<!-- Link to rejected candidates -->

| Candidate | Reason for Rejection |
|-----------|---------------------|
| [[Alternative 1]] | Reason |

## Implementation Notes

<!-- What needs to happen to implement this decision? -->

## Related Decisions

```dataview
TABLE status, date
FROM #type/decision
WHERE file.name != this.file.name
SORT date DESC
LIMIT 5
```
