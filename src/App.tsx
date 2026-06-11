/**
 * Placeholder root component for the React 19 strangler migration (bdui-321).
 *
 * This exists so the Vite toolchain has a real entry to render and so the
 * `@`→`/src` alias and React Compiler pipeline can be smoke-tested. Real views
 * are ported in later prep/migration stories.
 */
export function App() {
  return (
    <main>
      <h1>Beads UI — React shell</h1>
      <p>Vite + React 19 toolchain scaffolded. Migration in progress.</p>
    </main>
  );
}
