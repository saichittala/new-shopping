const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let child = null;
let isRestarting = false;
let restartTimeout = null;

const WATCHED_ROOT_FILES = new Set([
  'next.config.ts',
  'next-i18next.config.js',
  'postcss.config.js',
  'tsconfig.json',
  'package.json'
]);

function cleanCache() {
  const cachePath = path.join(process.cwd(), '.next');
  console.log('\x1b[33m%s\x1b[0m', '[dev-runner] Cleaning Next.js compilation directory (.next)...');
  try {
    if (fs.existsSync(cachePath)) {
      fs.rmSync(cachePath, { recursive: true, force: true });
    }
  } catch (err) {
    console.error('[dev-runner] Failed to clean cache:', err.message);
  }
}

function startDevServer() {
  console.log('\x1b[36m%s\x1b[0m', '[dev-runner] Starting Next.js dev server...');
  child = spawn('npx', ['next', 'dev'], {
    stdio: 'inherit',
    detached: true,
    shell: true
  });

  child.on('exit', (code, signal) => {
    if (!isRestarting) {
      console.log('\x1b[31m%s\x1b[0m', `[dev-runner] Dev server exited with code ${code} (signal: ${signal}). Waiting for changes to restart...`);
    }
  });
}

function triggerRestart(reason) {
  if (isRestarting) return;
  isRestarting = true;

  console.log('\x1b[33m%s\x1b[0m', `[dev-runner] Change detected in ${reason}. Restarting dev server...`);

  killDevServer(child, () => {
    cleanCache();
    isRestarting = false;
    startDevServer();
  });
}

function killDevServer(proc, callback) {
  if (!proc) return callback();
  
  try {
    process.kill(-proc.pid, 'SIGTERM');
  } catch (e) {
    try {
      proc.kill('SIGTERM');
    } catch (err) {}
  }

  let checks = 0;
  const interval = setInterval(() => {
    try {
      process.kill(proc.pid, 0);
      checks++;
      if (checks > 20) {
        clearInterval(interval);
        try {
          process.kill(-proc.pid, 'SIGKILL');
        } catch (e) {}
        callback();
      }
    } catch (e) {
      clearInterval(interval);
      callback();
    }
  }, 50);
}

// Debounce helper
function debounceRestart(filename) {
  if (restartTimeout) clearTimeout(restartTimeout);
  restartTimeout = setTimeout(() => {
    triggerRestart(filename);
  }, 300);
}

// Watch Root Configuration files
fs.watch(process.cwd(), (eventType, filename) => {
  if (filename && WATCHED_ROOT_FILES.has(filename)) {
    debounceRestart(filename);
  }
});

// Watch Styles
const stylesDir = path.join(process.cwd(), 'src/styles');
if (fs.existsSync(stylesDir)) {
  fs.watch(stylesDir, (eventType, filename) => {
    if (filename && filename.endsWith('.css')) {
      debounceRestart(`src/styles/${filename}`);
    }
  });
}

// Handle parent exit to kill child
process.on('exit', () => {
  if (child) {
    try {
      process.kill(-child.pid, 'SIGKILL');
    } catch (e) {}
  }
});

process.on('SIGINT', () => {
  if (child) {
    killDevServer(child, () => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

// Start initially
startDevServer();
