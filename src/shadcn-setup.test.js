import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Verifies the shadcn (base-vega / Base UI) scaffold for the React app (bdui-321.3):
// components.json shape, the cn util, the shadcn MCP server, and that the base
// components are Base UI render-prop based (NOT Radix `asChild`).
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(resolve(root, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));

const UI_COMPONENTS = {
  'button.tsx': 'Button',
  'badge.tsx': 'Badge',
  'card.tsx': 'Card',
  'dialog.tsx': 'Dialog',
  'dropdown-menu.tsx': 'DropdownMenu',
  'tooltip.tsx': 'Tooltip'
};

describe('shadcn base-vega scaffold', () => {
  it('components.json matches the wellness shape', () => {
    const c = readJson('components.json');
    expect(c.style).toBe('base-vega');
    expect(c.tsx).toBe(true);
    expect(c.tailwind.baseColor).toBe('neutral');
    expect(c.tailwind.cssVariables).toBe(true);
    expect(c.tailwind.css).toBe('src/index.css');
    expect(c.iconLibrary).toBe('lucide');
    expect(c.aliases).toMatchObject({
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      lib: '@/lib',
      hooks: '@/hooks'
    });
    expect(c.registries['@magicui']).toMatch(/magicui/);
    expect(c.registries['@aceternity']).toMatch(/aceternity/);
  });

  it('provides the cn utility (twMerge ∘ clsx)', () => {
    const u = read('src/lib/utils.ts');
    expect(u).toMatch(/export function cn/);
    expect(u).toMatch(/twMerge/);
    expect(u).toMatch(/clsx/);
  });

  it('registers the shadcn MCP server', () => {
    const mcp = readJson('.mcp.json');
    expect(mcp.mcpServers.shadcn).toBeDefined();
    expect(JSON.stringify(mcp.mcpServers.shadcn)).toMatch(/shadcn/);
  });

  it('ships the base components on Base UI (no Radix asChild)', () => {
    for (const [file, symbol] of Object.entries(UI_COMPONENTS)) {
      const src = read(`src/components/ui/${file}`);
      expect(src, `${file} exports ${symbol}`).toMatch(
        new RegExp(`\\b${symbol}\\b`)
      );
      expect(src, `${file} has no asChild`).not.toMatch(/asChild/);
    }
  });

  it('uses the Base UI render-prop pattern', () => {
    // Base UI composes via `render=` / `useRender`, not Radix `asChild`.
    const badge = read('src/components/ui/badge.tsx');
    const dialog = read('src/components/ui/dialog.tsx');
    expect(badge).toMatch(/@base-ui\/react/);
    expect(badge).toMatch(/useRender/);
    expect(dialog).toMatch(/render=\{/);
  });
});
