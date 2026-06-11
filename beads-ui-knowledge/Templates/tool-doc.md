---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: tool-doc
category: "11-Tools"
status: <%tp.system.suggester(['active', 'deprecated', 'archived'], ['active', 'deprecated', 'archived'])%>
source: ""
created: <%tp.date.now('YYYY-MM-DD')%>
updated: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/tool-doc, status/<%tp.system.suggester(['active', 'deprecated', 'archived'], ['active', 'deprecated', 'archived'])%>, tool/<%tp.system.prompt('Tool name (e.g., beads, mcp, hooks)')%>, domain/beads-ui]
---

# <%tp.file.title%>

> MOC: [[Home]]

**Status**: <%tp.system.suggester(['Active', 'Deprecated', 'Archived'], ['Active', 'Deprecated', 'Archived'])%>

## Overview

<!-- One-paragraph: what is this tool and what problem does it solve? -->

## Usage

<!-- How to use it — commands, API calls, configuration -->

## Configuration

<!-- Key settings, environment variables, config files -->

## Troubleshooting

<!-- Common issues and solutions -->

## Dependencies

<!-- Link to related capabilities, requirements, or other tools -->
- [[]]

## Related

```dataview
LIST
FROM "11-Tools"
WHERE file.name != this.file.name
SORT file.name ASC
```
