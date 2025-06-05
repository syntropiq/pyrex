# Project Plan: Pythonic Regex API in TypeScript

## Overview

This project provides a Python-like regex interface in TypeScript, exposing an API similar to Python's `re` module. It targets evergreen browsers and is built with Bun, Vite, ESLint, and Prettier for modern, zero-debt development.

---

## 1. Project Initialization

- Use Bun for package management and scripts.
- Set up Vite for build, testing, and bundling.
- Configure TypeScript for strict mode and latest ECMAScript targeting evergreen browsers.
- Add ESLint and Prettier for code quality and formatting.

---

## 2. Phase 1: Pythonic Regex Interface

- Design a TypeScript API that mirrors Python’s `re` module:
  - `re.match`
  - `re.search`
  - `re.compile`
  - `re.sub`
  - `re.split`
  - `re.findall`
  - `re.fullmatch`
  - `re.escape`
- Provide type definitions and documentation.
- Export as `re` for ergonomic imports.

---

## 3. Phase 2: Implementation

- **Regex Dispatch Logic:**
  - Analyze the regex pattern and flags.
  - If Python-only features are detected:
    - Use Pyodide to run Python’s `regex` package.
  - Otherwise:
    - Translate to the latest JS regex spec.
    - Use core-js polyfill for advanced features.
- Expose a seamless API regardless of backend.

---

## 4. Testing

- Write comprehensive unit tests for all API methods using Vite’s test runner.
- Include tests for both Python-only and JS-compatible regex patterns.

---

## 5. Documentation & Project Management

- `PLAN.md`: This architecture and implementation plan.
- `README.md`: Usage, installation, and contribution guidelines.
- `TODO.md`: Task breakdown and progress tracking.

---

## Mermaid Diagram: High-Level Architecture

```mermaid
flowchart TD
    A[User Code (TypeScript)] -->|import re| B[re API (TS Interface)]
    B --> C{Pattern Analysis}
    C -- Python-only features --> D[Pyodide + regex]
    C -- JS-compatible --> E[JS RegExp + core-js polyfill]
    D & E --> F[Unified Result]