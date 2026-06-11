---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: requirement
capability: "[[<%tp.system.prompt('Parent capability')%>]]"
status: <%tp.system.suggester(['red (no candidates)', 'yellow (candidates, no decision)', 'green (decision made)'], ['red', 'yellow', 'green'])%>
origin: <%tp.system.suggester(['initial', 'promoted_from_opportunity'], ['initial', 'promoted'])%>
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/requirement, status/active, domain/beads-ui]
---

# <%tp.file.title%>

**Capability**: [[<%tp.system.prompt('Parent capability')%>]]
**Status**: <%tp.system.suggester(['red (no candidates)', 'yellow (candidates exist)', 'green (decision made)'], ['red', 'yellow', 'green'])%>

## Overview

<!-- What is this requirement? Why is it needed? -->

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Candidates

<!-- Code/approaches from repos that satisfy this requirement -->

| Source | Approach | Quality | Code Path |
|--------|----------|---------|-----------|
| [[repo-name]] | Description | solid/prototype | `path/to/code.py:45` |

## Comparison

<!-- Pros/cons of each candidate -->

### Candidate 1
- **Strengths**:
- **Weaknesses**:

## Decision

<!-- Link to ADR if decision made -->
[[ADR-XXX]] - Pending

## Neo4j Query

```cypher
MATCH (r:Requirement {id: '<%tp.file.title.toLowerCase().replace(/ /g, '-')%>'})<-[:SATISFIES]-(c:Candidate)
RETURN c.name, c.code_path, c.quality
```
