---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: repository
note: "LEGACY TEMPLATE — use repo-index.md for new _index.md files. See .claude/rules/knowledge/repo-processing-workflow.md for the current standard."
status: <%tp.system.suggester(['not-analyzed', 'pass-1-complete', 'pass-2-complete', 'fully-analyzed'], ['not-analyzed', 'pass-1', 'pass-2', 'complete'])%>
url: "<%tp.system.prompt('GitHub URL')%>"
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/repository, domain/beads-ui]
---

# <%tp.file.title%>

**URL**: [GitHub](<%tp.system.prompt('GitHub URL')%>)
**Investigation**: `<%tp.file.title.toLowerCase()%>-investigation/`
**Analysis Status**: <%tp.system.suggester(['Not Started', 'Pass 1 Complete', 'Pass 2 Complete', 'Fully Analyzed'], ['Not Started', 'Pass 1 Complete', 'Pass 2 Complete', 'Fully Analyzed'])%>

## Overview

<!-- Brief description of what this repository does -->

## Key Features

<!-- Main capabilities this repo provides -->

- Feature 1
- Feature 2

## Candidates Provided

<!-- Code that satisfies known requirements -->

```dataview
TABLE requirement, quality, code_path
FROM #type/candidate
WHERE contains(source, "<%tp.file.title%>")
```

## Opportunities Discovered

<!-- Valuable features not matching existing requirements -->

```dataview
TABLE potential_capability, value_proposition, status
FROM #type/opportunity
WHERE contains(source, "<%tp.file.title%>")
```

## Tech Stack

- **Language**:
- **Framework**:
- **Dependencies**:

## Integration Notes

<!-- How this repo could integrate with Horde -->

## Investigation Files

<!-- Links to analysis documents -->
- [[<%tp.file.title.toLowerCase()%>-investigation]]
