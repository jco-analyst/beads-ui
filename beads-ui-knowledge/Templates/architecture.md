---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: architecture
category: "12-Architecture"
status: <%tp.system.suggester(['draft', 'active', 'superseded'], ['draft', 'active', 'superseded'])%>
source: ""
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/architecture, status/<%tp.system.suggester(['draft', 'active', 'superseded'], ['draft', 'active', 'superseded'])%>, scope/<%tp.system.suggester(['system', 'component', 'integration'], ['system', 'component', 'integration'])%>, domain/beads-ui]
---

# <%tp.file.title%>

> MOC: [[Home]]

**Status**: <%tp.system.suggester(['Draft', 'Active', 'Superseded'], ['Draft', 'Active', 'Superseded'])%>
**Date**: <%tp.date.now('YYYY-MM-DD')%>

## Overview

<!-- One-paragraph: high-level description of this architectural element -->

## Components

<!-- Key components, their responsibilities, and interactions -->

## Trade-offs

<!-- What was gained and given up with this architecture -->

### Chosen Approach
-

### Alternatives Rejected
-

## Diagrams

<!-- Mermaid diagrams, ASCII art, or links to 06-Diagrams/ -->

## Dependencies

<!-- Link to related decisions, requirements, designs -->
- [[]]

## Related

```dataview
TABLE status, updated
FROM "12-Architecture"
WHERE file.name != this.file.name
SORT updated DESC
LIMIT 5
```
