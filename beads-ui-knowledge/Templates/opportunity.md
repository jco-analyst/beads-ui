---
id: "<%tp.date.now('YYYYMMDDHHmm')%>"
title: "<%tp.file.title%>"
aliases: []
summary: "One-line description of this file's content"
type: opportunity
source: "[[<%tp.system.prompt('Source repository')%>]]"
potential_capability: <%tp.system.suggester(['Agent Persistence', 'Process Management', 'Coordination', 'Model Routing', 'System Modularity', 'NEW'], ['agent-persistence', 'process-management', 'coordination', 'model-routing', 'system-modularity', 'new'])%>
status: <%tp.system.suggester(['backlog', 'promoted', 'rejected'], ['backlog', 'promoted', 'rejected'])%>
promoted_to:
created: <%tp.date.now('YYYY-MM-DD')%>
tags: [type/opportunity, status/<%tp.system.suggester(['backlog', 'promoted', 'rejected'], ['backlog', 'promoted', 'rejected'])%>, domain/beads-ui]
---

# <%tp.file.title%>

**Source**: [[<%tp.system.prompt('Source repository')%>]]
**Potential Capability**: <%tp.system.suggester(['Agent Persistence', 'Process Management', 'Coordination', 'Model Routing', 'System Modularity', 'NEW'], ['Agent Persistence', 'Process Management', 'Coordination', 'Model Routing', 'System Modularity', 'NEW'])%>
**Status**: <%tp.system.suggester(['Backlog', 'Promoted', 'Rejected'], ['Backlog', 'Promoted', 'Rejected'])%>

## Overview

<!-- What is this feature? Why is it valuable? -->

## Value Proposition

<!-- Why would this benefit Horde? -->

## Code Location

```
<%tp.system.prompt('Code path if applicable')%>
```

## Promotion Rationale

<!-- If promoted, why should this become a requirement? -->

## Rejection Rationale

<!-- If rejected, why was this not pursued? -->

## Promoted To

<!-- If promoted, link to the new requirement -->
