# Graph Report - beads-ui  (2026-06-11)

## Corpus Check
- 1067 files · ~1,344,069 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 443 nodes · 685 edges · 36 communities (29 shown, 7 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a45555c5`
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
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]

## God Nodes (most connected - your core abstractions)
1. `bootstrap()` - 29 edges
2. `debug()` - 29 edges
3. `createSubscriptionIssueStore()` - 23 edges
4. `scripts` - 18 edges
5. `createDetailView()` - 17 edges
6. `createListSelectors()` - 11 edges
7. `createListView()` - 10 edges
8. `Project Instructions for AI Agents` - 9 edges
9. `ADR-<%tp.system.prompt('ADR Number')%>: <%tp.file.title%>` - 9 edges
10. `createBoardView()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `createSubscriptionIssueStore()` --calls--> `debug()`  [INFERRED]
  app/data/subscription-issue-store.js → app/utils/logging.js
- `bootstrap()` --calls--> `createDetailView()`  [INFERRED]
  app/main.js → app/views/detail.js
- `bootstrap()` --calls--> `createIssueDialog()`  [INFERRED]
  app/main.js → app/views/issue-dialog.js
- `createDetailView()` --calls--> `debug()`  [INFERRED]
  app/views/detail.js → app/utils/logging.js
- `bootstrap()` --calls--> `createListSelectors()`  [INFERRED]
  app/main.js → app/data/list-selectors.js

## Import Cycles
- None detected.

## Communities (36 total, 7 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (26): bootstrap(), createHashRouter(), parseHash(), parseView(), createStore(), createWsClient(), createListSelectors(), createDataLayer() (+18 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (11): createTestIssueStores(), setup(), createSubscriptionIssueStore(), createTestIssueStores(), createTestIssueStores(), createTestIssueStores(), createTestIssueStores(), createTestIssueStores() (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (11): createIssueIdRenderer(), ISSUE_TYPES, typeLabel(), createPriorityBadge(), emojiForPriority(), labelForPriority(), priority_levels, STATUSES (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.17
Nodes (10): decodeReply(), decodeRequest(), isMessageType(), isRecord(), isReply(), isRequest(), makeError(), makeOk() (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (40): author, bin, bdui, dependencies, debug, dompurify, express, lit-html (+32 more)

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (11): Architecture Overview, Beads Issue Tracker, Beads (project-specific config), Build & Test, Code understanding — tool router, Conventions & Patterns, Knowledge vault (`beads-ui-knowledge/`), Project Instructions for AI Agents (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (18): devDependencies, esbuild, eslint, @eslint/js, eslint-plugin-import, eslint-plugin-jsdoc, eslint-plugin-n, globals (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (4): hooks, PreCompact, PreToolUse, SessionStart

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (12): ADR-<%tp.system.prompt('ADR Number')%>: <%tp.file.title%>, Alternatives Considered, Consequences, Context, Decision, Implementation Notes, Negative, Positive (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.20
Nodes (9): Alternatives Rejected, Chosen Approach, Components, Dependencies, Diagrams, Overview, Related, <%tp.file.title%> (+1 more)

### Community 19 - "Community 19"
Cohesion: 0.22
Nodes (8): Code Location, Dependencies, Implementation Notes, Overview, Related Candidates, Strengths, <%tp.file.title%>, Weaknesses

### Community 20 - "Community 20"
Cohesion: 0.22
Nodes (8): Candidates Provided, Integration Notes, Investigation Files, Key Features, Opportunities Discovered, Overview, Tech Stack, <%tp.file.title%>

### Community 21 - "Community 21"
Cohesion: 0.22
Nodes (8): Acceptance Criteria, Candidate 1, Candidates, Comparison, Decision, Neo4j Query, Overview, <%tp.file.title%>

### Community 24 - "Community 24"
Cohesion: 0.46
Nodes (7): check_scripts(), command_of(), is_superseded(), load_settings(), main(), Return (new_settings, actions). Pure — does not write., reconcile()

### Community 25 - "Community 25"
Cohesion: 0.25
Nodes (7): Architecture Notes, Open Questions, Overview, Related Capabilities, Requirements, Status Summary, <%tp.file.title%>

### Community 26 - "Community 26"
Cohesion: 0.25
Nodes (7): Context, Dependencies, Design, Implementation Plan, Open Questions, Related, <%tp.file.title%>

### Community 27 - "Community 27"
Cohesion: 0.25
Nodes (7): Dependencies, Key Findings, Recommendations, Related, Relevant Code, Summary, <%tp.file.title%>

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (7): Code Location, Overview, Promoted To, Promotion Rationale, Rejection Rationale, <%tp.file.title%>, Value Proposition

### Community 29 - "Community 29"
Cohesion: 0.25
Nodes (7): Background, Dependencies, Findings, Implications, References, Related, <%tp.file.title%>

### Community 30 - "Community 30"
Cohesion: 0.25
Nodes (7): Configuration, Dependencies, Overview, Related, <%tp.file.title%>, Troubleshooting, Usage

### Community 31 - "Community 31"
Cohesion: 0.29
Nodes (6): Dependencies, Handoff Notes, Key Decisions, Next Steps, Session Summary, <%tp.file.title%>

### Community 33 - "Community 33"
Cohesion: 0.40
Nodes (4): Cross-Repo Research, File Map, MVP Notes, <%tp.file.title%>

## Knowledge Gaps
- **153 isolated node(s):** `tool-router-nudge.sh script`, `PreCompact`, `SessionStart`, `PreToolUse`, `Quick Reference` (+148 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `createDetailView()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `debug()` connect `Community 1` to `Community 0`, `Community 2`, `Community 4`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `bootstrap()` connect `Community 1` to `Community 0`, `Community 32`, `Community 3`, `Community 4`, `Community 6`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 22`, `Community 23`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `bootstrap()` (e.g. with `createHashRouter()` and `createStore()`) actually correct?**
  _`bootstrap()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 14 inferred relationships involving `debug()` (e.g. with `bootstrap()` and `createHashRouter()`) actually correct?**
  _`debug()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Return (new_settings, actions). Pure — does not write.`, `tool-router-nudge.sh script`, `PreCompact` to the rest of the system?**
  _154 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05142857142857143 - nodes in this community are weakly interconnected._