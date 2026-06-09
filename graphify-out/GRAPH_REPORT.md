# Graph Report - beads-ui  (2026-06-09)

## Corpus Check
- 1052 files · ~1,342,067 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 261 nodes · 514 edges · 27 communities (23 shown, 4 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe89c2aa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]

## God Nodes (most connected - your core abstractions)
1. `bootstrap()` - 29 edges
2. `debug()` - 29 edges
3. `createSubscriptionIssueStore()` - 23 edges
4. `createDetailView()` - 17 edges
5. `createListSelectors()` - 11 edges
6. `createListView()` - 10 edges
7. `createBoardView()` - 9 edges
8. `createWsClient()` - 9 edges
9. `Project Instructions for AI Agents` - 8 edges
10. `createSubscriptionStore()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `bootstrap()` --calls--> `createListSelectors()`  [INFERRED]
  app/main.js → app/data/list-selectors.js
- `createEpicsView()` --calls--> `createListSelectors()`  [INFERRED]
  app/views/epics.js → app/data/list-selectors.js
- `createListView()` --calls--> `createListSelectors()`  [INFERRED]
  app/views/list.js → app/data/list-selectors.js
- `createSubscriptionIssueStore()` --calls--> `debug()`  [INFERRED]
  app/data/subscription-issue-store.js → app/utils/logging.js
- `bootstrap()` --calls--> `createWsClient()`  [INFERRED]
  app/main.js → app/ws.js

## Import Cycles
- None detected.

## Communities (27 total, 4 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (15): bootstrap(), createHashRouter(), parseHash(), parseView(), createStore(), createDataLayer(), createSubscriptionIssueStores(), createSubscriptionStore() (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (16): createListSelectors(), createTestIssueStores(), setup(), cmpClosedDesc(), cmpPriorityThenCreated(), createSubscriptionIssueStore(), createTestIssueStores(), COLUMN_STATUS_MAP (+8 more)

### Community 3 - "Community 3"
Cohesion: 0.19
Nodes (10): ISSUE_TYPES, typeLabel(), createPriorityBadge(), emojiForPriority(), labelForPriority(), priority_levels, STATUSES, statusLabel() (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.42
Nodes (9): decodeReply(), decodeRequest(), isMessageType(), isRecord(), isReply(), isRequest(), makeError(), makeOk() (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.26
Nodes (4): createIssueIdRenderer(), createEpicsView(), createIssueDialog(), createIssueRowRenderer()

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (5): calls, issues, calls, nextId(), createWsClient()

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (10): Architecture Overview, Beads Issue Tracker, Beads (project-specific config), Build & Test, Conventions & Patterns, graphify, Project Instructions for AI Agents, Quick Reference (+2 more)

### Community 8 - "Community 8"
Cohesion: 0.29
Nodes (3): issueHashFor(), renderMarkdown(), showToast()

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (4): hooks, PreCompact, PreToolUse, SessionStart

## Knowledge Gaps
- **18 isolated node(s):** `PreCompact`, `SessionStart`, `PreToolUse`, `Quick Reference`, `Rules` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createDetailView()` connect `Community 0` to `Community 1`, `Community 8`, `Community 14`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 26`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `debug()` connect `Community 1` to `Community 8`, `Community 0`, `Community 2`, `Community 6`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `bootstrap()` connect `Community 1` to `Community 0`, `Community 2`, `Community 3`, `Community 5`, `Community 6`, `Community 10`, `Community 11`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `bootstrap()` (e.g. with `createHashRouter()` and `createStore()`) actually correct?**
  _`bootstrap()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `debug()` (e.g. with `bootstrap()` and `createHashRouter()`) actually correct?**
  _`debug()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `createDetailView()` (e.g. with `bootstrap()` and `debug()`) actually correct?**
  _`createDetailView()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `createListSelectors()` (e.g. with `bootstrap()` and `createBoardView()`) actually correct?**
  _`createListSelectors()` has 4 INFERRED edges - model-reasoned connections that need verification._