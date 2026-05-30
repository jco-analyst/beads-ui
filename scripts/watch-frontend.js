#!/usr/bin/env node
/**
 * Watch mode for frontend bundle — rebuilds on every file change.
 * Unminified output for easier debugging. Source maps always on.
 * Press Ctrl-C to stop.
 */
import path from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const this_file = fileURLToPath(new URL(import.meta.url));
const repo_root = path.resolve(path.dirname(this_file), '..');
const app_dir = path.join(repo_root, 'app');
const entry = path.join(app_dir, 'main.js');
const outfile = path.join(app_dir, 'main.bundle.js');

mkdirSync(app_dir, { recursive: true });

const esbuild = await import('esbuild');

const ctx = await esbuild.context({
  entryPoints: [entry],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  outfile,
  sourcemap: true,
  minify: false,
  legalComments: 'none'
});

await ctx.watch();
console.log('[watch] watching app/ for changes — refresh browser after each rebuild');

process.on('SIGINT', async () => {
  await ctx.dispose();
  process.exit(0);
});
