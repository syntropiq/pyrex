# Project Plan: Pythonic Regex API in TypeScript

## ⚠️ CRITICAL ISSUE - PHASE 1 (BLOCKING)

### Pyodide Initialization Failure

**Problem:** Pyodide cannot initialize properly, completely blocking all Python backend functionality.

**Root Cause:** 
- Missing `indexURL` configuration in Pyodide initialization
- Incorrect asset path resolution preventing Pyodide from loading required files
- Current initialization in [`src/backends/python.ts`](src/backends/python.ts:1) fails silently or with unclear errors

**GitHub Copilot Proposed Solution:**
```typescript
// In src/backends/python.ts
import { loadPyodide } from 'pyodide';

async function initializePyodide() {
  const pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    // Alternative for local development:
    // indexURL: 'node_modules/pyodide/',
  });
  return pyodide;
}
```

**Impact:** 
- All Python backend tests fail
- Pattern registry implementation cannot be tested or used
- Project is effectively non-functional for Python regex operations

**Priority:** Must be resolved before any other development can proceed.

---

## PHASE 2: Python Backend Pattern Registry

### Problem
Python regex patterns are recompiled on every operation, causing inefficiency and potential bugs.

**Note:** This implementation depends on resolving the critical pyodide issue first.

### Solution
- Implement a Python-side registry (dict) to store compiled patterns, keyed by handle (UUID/int).
- On `compile`, store the pattern and return a handle to TypeScript.
- All subsequent operations (`search`, `match`, etc.) use the handle to retrieve the compiled pattern.
- Update TypeScript classes to store and use the handle.
- Update FFI/glue code for handle-based operations.

---

## PHASE 2: Testing

- **First:** Verify pyodide initialization works correctly
- Update and expand tests in [`test/basic.test.ts`](test/basic.test.ts:1) to cover:
  - Pyodide loading and initialization
  - Pattern reuse via handle
  - No repeated compilation
  - Regression and error handling

---

## PHASE 2: Documentation

- Update [`README.md`](README.md:1) to describe the new backend design.
- Document pyodide initialization requirements and troubleshooting
- Update [`TODO.md`](TODO.md:1) to reflect new tasks and progress.

---

## PHASE 3: Future Improvements (Outline)

- **Backend Abstraction:**  
  Refactor backend selection logic for extensibility (e.g., support for additional regex engines).
- **API Ergonomics:**  
  Enhance async/sync API consistency.
- **Performance:**  
  Explore caching and pooling for JS backend.
- **DX:**  
  Improve error messages and developer tooling.

---

## Mermaid Diagram

```mermaid
flowchart TD
    A[TypeScript: PythonPattern] -- compile(pattern) --> B[Python: Registry]
    B -- handle --> A
    A -- search/match/etc(handle) --> B
    B -- result --> A