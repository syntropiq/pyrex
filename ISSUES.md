## [CRITICAL] Pyodide Backend Completely Broken - Cannot Initialize

**Summary:**
The Pyodide Python backend fails to initialize, completely blocking all Python pattern tests. This is a fundamental blocker preventing any Python regex functionality.

**Facts from Investigation:**
1. **File Path Errors:** Pyodide is looking for files in `/node_modules/pyodide/` but trying to access them via incorrect paths like `/node_modules/src/js/pyodide.asm.js`
2. **Missing indexURL Configuration:** The `loadPyodide()` call lacks indexURL configuration to specify where Pyodide assets are located
3. **Pattern Selection Logic Inconsistent:** Some `(?P<name>...)` patterns are incorrectly routed to JavaScript backend instead of Python backend, causing "Invalid group" syntax errors
4. **Test Environment Issues:** JSdom test environment may not properly handle Pyodide's WebAssembly loading requirements

**Error Messages:**
```
Cannot find module '/Users/steve/Projects/amjur.org/pyrex/node_modules/src/js/pyodide.asm.js' imported from /Users/steve/Projects/amjur.org/pyrex/node_modules/pyodide/pyodide.mjs
ENOENT: no such file or directory, open '/node_modules/pyodide/python_stdlib.zip'
ENOENT: no such file or directory, open '/node_modules/pyodide/pyodide.asm.wasm'
ENOENT: no such file or directory, open '/node_modules/pyodide/pyodide-lock.json'
Invalid regular expression: /(?P<num>\d+)/: Invalid group
```

**Status:** BLOCKING - No Python pattern functionality works until resolved.

**ANALYSIS:**
Looking at your Pyodide initialization issue, this is a common problem with Pyodide's asset loading in Node.js environments. Let me break down the root causes and provide the best fix:

## Root Causes

1. **Missing `indexURL` Configuration**: Pyodide needs to know where its assets (`.wasm`, `.js`, `.zip` files) are located. Without this, it defaults to looking in the wrong paths.

2. **Incorrect Asset Path Resolution**: The error shows Pyodide is looking for files like `/node_modules/src/js/pyodide.asm.js` when they're actually in `/node_modules/pyodide/`.

3. **JSdom/Node.js Environment Issues**: Pyodide is primarily designed for browsers, so running it in a Node.js test environment (JSdom) requires special configuration.

## Best Fix

Here's the proper way to initialize Pyodide in your backend:

```typescript
// src/backends/python.ts
import { loadPyodide } from 'pyodide';
import path from 'path';
import { fileURLToPath } from 'url';

// For ES modules, get the current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function initializePyodide() {
  // Set the indexURL to point to the correct Pyodide assets location
  const indexURL = path.join(__dirname, '../../node_modules/pyodide/');
  
  const pyodide = await loadPyodide({
    indexURL: `file://${indexURL}`,
    // For Node.js environments, you may also need:
    packageCacheDir: path.join(__dirname, '../../.pyodide-cache'),
  });
  
  return pyodide;
}
```

## Alternative Solutions

### Option 1: Use CDN (Recommended for most cases)
```typescript
const pyodide = await loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
});
```

### Option 2: Copy assets to public directory
If you're in a web environment, copy Pyodide assets to your public directory and reference them:
```typescript
const pyodide = await loadPyodide({
  indexURL: "/static/pyodide/",
});
```

### Option 3: For Jest/Testing environments
Add this to your Jest configuration or test setup:
```javascript
// jest.config.js or test setup
global.fetch = require('node-fetch');
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Mock WebAssembly if needed
if (typeof WebAssembly === 'undefined') {
  global.WebAssembly = require('webassembly');
}
```

## Pattern Routing Fix

For the "Invalid group" error with `(?P<name>...)` patterns, ensure your pattern detection logic properly identifies Python-style named groups:

```typescript
function shouldUsePythonBackend(pattern: string): boolean {
  // Python-style named groups: (?P<name>...)
  const pythonNamedGroups = /\(\?P<\w+>/;
  // JavaScript doesn't support (?P<name>) syntax
  return pythonNamedGroups.test(pattern);
}
```

## Testing Environment Considerations

If you're running tests in Node.js with JSdom, you might want to:

1. **Use a separate test configuration** that mocks the Pyodide backend
2. **Run Pyodide tests in a real browser environment** using tools like Playwright or Puppeteer
3. **Consider using a Python subprocess** instead of Pyodide for testing to avoid WebAssembly complications

The indexURL configuration is the most critical fix - once Pyodide knows where to find its assets, most of these errors should resolve.

---
# ISSUES

## [Performance/Design] Python regex patterns are recompiled on every operation

**Summary:**
Currently, in `src/backends/python.ts`, every regex operation (search, match, fullmatch, etc.) recompiles the pattern in the Python backend via Pyodide. This is inefficient and error-prone.

**Details:**
- Each call to `search`, `match`, `fullmatch`, etc. in `PythonPattern` results in a new call to `re.compile` in Python.
- This means the same pattern is recompiled for every operation, which is slow and can introduce subtle bugs.
- The optimal approach is to compile each pattern once in Python, store it in a registry, and refer to it by handle for all subsequent operations via FFI.

**Proposed Solution:**
- On pattern compilation, store the compiled pattern in a Python-side registry (e.g., a dict keyed by UUID or integer).
- Return the handle to TypeScript and use it for all future operations on that pattern.
- Update all backend calls to use the handle instead of recompiling.

**Benefits:**
- Improved performance (no repeated compilation)
- Cleaner and safer FFI
- Consistent pattern state

---

*Filed automatically by GitHub Copilot on 2025-06-05.*
