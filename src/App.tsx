/**
 * Placeholder root component for the React 19 strangler migration (bdui-321).
 *
 * This exists so the Vite toolchain has a real entry to render and so the
 * `@`→`/src` alias and React Compiler pipeline can be smoke-tested. Real views
 * are ported in later prep/migration stories.
 *
 * The Tailwind v4 utilities below (bdui-321.2) double as a smoke test that the
 * CSS-first setup compiles: neutral surface tokens, a ported status hue, and a
 * `dark:` variant all exercise `src/index.css`.
 */
export function App() {
  return (
    <main className="min-h-screen bg-background p-8 font-sans text-foreground">
      <h1 className="text-2xl font-semibold">Beads UI — React shell</h1>
      <p className="mt-2 text-muted">
        Vite + React 19 toolchain scaffolded. Migration in progress.
      </p>
      <div className="mt-4 flex gap-2 text-sm font-medium">
        <span className="rounded-full bg-status-open/15 px-3 py-1 text-status-open dark:bg-status-open/25">
          status: open
        </span>
        <span className="rounded-full bg-type-bug/15 px-3 py-1 text-type-bug dark:bg-type-bug/25">
          type: bug
        </span>
        <span className="rounded-full bg-priority-p0/15 px-3 py-1 text-priority-p0 dark:bg-priority-p0/25">
          priority: p0
        </span>
      </div>
    </main>
  );
}
