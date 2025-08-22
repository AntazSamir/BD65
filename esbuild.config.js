import * as esbuild from 'esbuild';
import { join } from 'path';
import { readdirSync, statSync } from 'fs';

// Use process.cwd() to get the current working directory where the build is running
const currentDir = process.cwd();

console.log('Current working directory:', currentDir);
console.log('Directory contents:', readdirSync(currentDir));

// Check if server directory exists
const serverDir = join(currentDir, 'server');
if (statSync(serverDir, { throwIfNoEntry: false })) {
  console.log('Server directory contents:', readdirSync(serverDir));
} else {
  console.log('Server directory does not exist at:', serverDir);
}

// Try different possible paths
const possiblePaths = [
  join(currentDir, 'server', 'index.ts'),
  join(currentDir, '..', 'server', 'index.ts'),
  join(currentDir, '..', '..', 'server', 'index.ts'),
  'server/index.ts',
  './server/index.ts'
];

console.log('Trying possible paths:', possiblePaths);

// Find the first path that exists
let serverEntry = null;
for (const path of possiblePaths) {
  try {
    if (statSync(path, { throwIfNoEntry: false })) {
      serverEntry = path;
      console.log('Found server entry at:', serverEntry);
      break;
    }
  } catch (error) {
    // Path doesn't exist, continue to next
  }
}

if (!serverEntry) {
  console.error('Could not find server/index.ts in any of the expected locations');
  process.exit(1);
}

esbuild.build({
  entryPoints: [serverEntry],
  platform: 'node',
  bundle: true,
  format: 'esm',
  outdir: 'dist',
  external: [
    'express',
    'express-session',
    'passport',
    'passport-local',
    'bcrypt',
    'ws',
    'memorystore',
    'connect-pg-simple',
    'drizzle-orm',
    'openid-client',
    'zod',
    'zod-validation-error',
    'date-fns',
    'jspdf',
    'html2canvas',
    'purify-js',
    '@babel/*',
    'lightningcss',
    '@babel/preset-typescript',
    '@babel/core'
  ],
  logLevel: 'info'
}).catch((error) => {
  console.error('Esbuild build failed:', error);
  process.exit(1);
});