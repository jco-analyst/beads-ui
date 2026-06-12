# Conventions & Patterns

Coding conventions for this vanilla-JS / lit-html codebase.

- **Modules:** ECMAScript modules everywhere. `.js` for runtime (with JSDoc
  `@param`/`@import` types), `.ts` only for pure type/interface definitions (no
  runtime side effects).
- **Naming:** `PascalCase` classes/interfaces · `camelCase` functions/methods
  (and callable-valued vars) · `lower_snake_case` variables/params ·
  `UPPER_SNAKE_CASE` constants · `kebab-case` files/dirs.
- **JSDoc:** annotate all functions; declare every `@param`; add `@returns` only
  when the return type isn't self-evident. Add `@type` for ambiguous or
  empty-collection (`{}`/`[]`/`new Map()`) locals.
- **Control flow:** always brace bodies. Use `?.`/`??` only for
  intentionally-nullable values — prefer explicit narrowing.

> Note: the React 19 / TS migration (epic `bdui-321`) introduces a parallel TSX
> convention set under `src/` (bundler-mode TS, `react-jsx`). The rules above
> govern the legacy `app/` (lit-html) + `server/` JSDoc-JS code, which remains
> the source of truth until the strangler migration completes.
