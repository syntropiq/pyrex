# Project Plan: Pythonic Regex API in TypeScript

## 1. Immediate Objective: Python Backend Pattern Registry

### Problem
Python regex patterns are recompiled on every operation, causing inefficiency and potential bugs.

### Solution
- Implement a Python-side registry (dict) to store compiled patterns, keyed by handle (UUID/int).
- On `compile`, store the pattern and return a handle to TypeScript.
- All subsequent operations (`search`, `match`, etc.) use the handle to retrieve the compiled pattern.
- Update TypeScript classes to store and use the handle.
- Update FFI/glue code for handle-based operations.

---

## 2. Testing

- Update and expand tests in [`test/basic.test.ts`](test/basic.test.ts:1) to cover:
  - Pattern reuse via handle.
  - No repeated compilation.
  - Regression and error handling.

---

## 3. Documentation

- Update [`README.md`](README.md:1) to describe the new backend design.
- Update [`SUMMARY.md`](SUMMARY.md:1) and [`TODO.md`](TODO.md:1) to reflect new tasks and progress.

---

## 4. Future Improvements (Outline)

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