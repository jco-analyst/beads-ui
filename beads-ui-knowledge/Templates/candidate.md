---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: candidate
requirement: "[[<%tp.system.prompt('Requirement this satisfies')%>]]"
source: "[[<%tp.system.prompt('Source repository')%>]]"
complexity: <%tp.system.suggester(['low', 'medium', 'high'], ['low', 'medium', 'high'])%>
quality: <%tp.system.suggester(['prototype', 'solid', 'production'], ['prototype', 'solid', 'production'])%>
created: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/candidate, domain/beads-ui]
---

# <%tp.file.title%>

**Requirement**: [[<%tp.system.prompt('Requirement this satisfies')%>]]
**Source**: [[<%tp.system.prompt('Source repository')%>]]
**Quality**: <%tp.system.suggester(['Prototype', 'Solid', 'Production'], ['Prototype', 'Solid', 'Production'])%>

## Overview

<!-- What does this candidate do? How does it satisfy the requirement? -->

## Code Location

```
<%tp.system.prompt('Code path (e.g., src/monitor.py:45-120)')%>
```

## Strengths

- Strength 1
- Strength 2

## Weaknesses

- Weakness 1
- Weakness 2

## Implementation Notes

<!-- What would it take to adopt this? -->

## Dependencies

<!-- What does this code depend on? -->

## Related Candidates

<!-- Other candidates for the same requirement -->
