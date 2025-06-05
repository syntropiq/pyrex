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
