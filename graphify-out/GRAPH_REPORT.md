# Graph Report - /mnt/main/beads-ui/app  (2026-06-09)

## Corpus Check
- Corpus is ~43,454 words - fits in a single context window. You may not need a graph.

## Summary
- 245 nodes · 500 edges · 18 communities (12 shown, 6 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
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
9. `createSubscriptionStore()` - 6 edges
10. `createStore()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `bootstrap()` --calls--> `createListSelectors()`  [INFERRED]
  /mnt/main/beads-ui/app/main.js → /mnt/main/beads-ui/app/data/list-selectors.js
- `createEpicsView()` --calls--> `createListSelectors()`  [INFERRED]
  /mnt/main/beads-ui/app/views/epics.js → /mnt/main/beads-ui/app/data/list-selectors.js
- `createSubscriptionIssueStore()` --calls--> `debug()`  [INFERRED]
  /mnt/main/beads-ui/app/data/subscription-issue-store.js → /mnt/main/beads-ui/app/utils/logging.js
- `bootstrap()` --calls--> `createBoardView()`  [INFERRED]
  /mnt/main/beads-ui/app/main.js → /mnt/main/beads-ui/app/views/board.js
- `bootstrap()` --calls--> `createDetailView()`  [INFERRED]
  /mnt/main/beads-ui/app/main.js → /mnt/main/beads-ui/app/views/detail.js

## Import Cycles
- None detected.

## Communities (18 total, 6 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (16): bootstrap(), createHashRouter(), parseHash(), parseView(), createStore(), createWsClient(), createDataLayer(), createSubscriptionIssueStores() (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (17): createListSelectors(), createTestIssueStores(), setup(), cmpClosedDesc(), cmpPriorityThenCreated(), createSubscriptionIssueStore(), createTestIssueStores(), COLUMN_STATUS_MAP (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (12): ISSUE_TYPES, typeLabel(), issueHashFor(), renderMarkdown(), createPriorityBadge(), emojiForPriority(), labelForPriority(), priority_levels (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.36
Nodes (10): decodeReply(), decodeRequest(), isMessageType(), isRecord(), isReply(), isRequest(), makeError(), makeOk() (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.26
Nodes (4): createIssueIdRenderer(), createEpicsView(), createIssueDialog(), createIssueRowRenderer()

## Knowledge Gaps
- **7 isolated node(s):** `calls`, `issues`, `calls`, `issues`, `STATUSES` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createDetailView()` connect `Community 0` to `Community 1`, `Community 3`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Why does `debug()` connect `Community 1` to `Community 0`, `Community 2`, `Community 3`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `bootstrap()` connect `Community 1` to `Community 0`, `Community 2`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 14`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `bootstrap()` (e.g. with `createHashRouter()` and `createStore()`) actually correct?**
  _`bootstrap()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `debug()` (e.g. with `bootstrap()` and `createHashRouter()`) actually correct?**
  _`debug()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `createDetailView()` (e.g. with `bootstrap()` and `debug()`) actually correct?**
  _`createDetailView()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `createListSelectors()` (e.g. with `bootstrap()` and `createBoardView()`) actually correct?**
  _`createListSelectors()` has 4 INFERRED edges - model-reasoned connections that need verification._