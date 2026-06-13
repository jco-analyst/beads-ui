import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Verifies the Tailwind v4 CSS-first setup for the React strangler app (bdui-321.2):
// the @tailwindcss/vite plugin is wired, src/index.css uses the v4 directives, and
// the beads status/type/priority palette is ported to @theme color tokens.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(resolve(root, p), 'utf8');

describe('Tailwind v4 setup', () => {
  it('wires @tailwindcss/vite into the Vite config', () => {
    const cfg = read('vite.config.ts');
    expect(cfg).toMatch(/from ['"]@tailwindcss\/vite['"]/);
    expect(cfg).toMatch(/tailwindcss\(\)/);
  });

  it('src/index.css uses the v4 CSS-first directives', () => {
    const css = read('src/index.css');
    expect(css).toMatch(/@import ['"]tailwindcss['"]/);
    expect(css).toMatch(/@plugin ['"]tailwindcss-animate['"]/);
    expect(css).toMatch(/@custom-variant dark/);
    expect(css).toMatch(/@theme\s*{/);
  });

  it('ports the beads status/type palette to @theme color tokens', () => {
    const css = read('src/index.css');
    for (const token of [
      '--color-status-open',
      '--color-status-in-progress',
      '--color-status-closed',
      '--color-type-bug',
      '--color-type-task',
      '--color-type-epic',
      '--color-type-feature',
      '--color-type-chore'
    ]) {
      expect(css).toContain(token);
    }
  });

  it('loads the stylesheet from the React entrypoint', () => {
    const main = read('src/main.tsx');
    expect(main).toMatch(/import ['"][@./]*\/?index\.css['"]/);
  });

  it('renders a sample Tailwind utility class in the app shell', () => {
    const app = read('src/App.tsx');
    // A real Tailwind utility (not just any className) must be present so the
    // build can be proven to emit a generated rule.
    expect(app).toMatch(/className=/);
    expect(app).toMatch(/\b(bg-|text-|p-|flex|gap-|rounded|font-)/);
  });
});
