# Pythonic Regex API in TypeScript

A TypeScript library providing a Python-like `re` interface for regex operations, targeting evergreen browsers. The API closely mirrors Python’s `re` module, with seamless support for both JavaScript and Python-only regex features.

---

## Features

- Pythonic API: `re.match`, `re.search`, `re.compile`, `re.sub`, `re.split`, `re.findall`, `re.fullmatch`, `re.escape`
- Automatic backend selection:
  - Uses Pyodide and Python’s `regex` package for Python-only features
  - Uses latest JS RegExp and core-js polyfill for JS-compatible patterns
- **Efficient Python backend:** Patterns are compiled once and stored in a Python-side registry, with all operations using a handle for optimal performance.
- Written in modern TypeScript, targeting evergreen browsers
- Zero technical debt: Bun for scripts, Vite for build/test/bundle, ESLint + Prettier for code quality

---

## Installation

```sh
bun install @syntropiq/pyrex
```

---

## Usage

```typescript
import * as re from '@syntropiq/pyrex';

const result = re.match('a(b+)', 'abbb');
if (result) {
  console.log(result.group(1)); // 'bbb'
}
```

---

## Python Backend Registry

- When using Python-only regex features, patterns are compiled once and stored in a Python-side registry (dict).
- Each pattern is referenced by a handle (UUID or integer).
- All subsequent operations (`search`, `match`, etc.) use the handle, avoiding repeated compilation and improving performance.

---

## Development

- **Build:** `bun run build`
- **Test:** `bun run test`
- **Lint:** `bun run lint`
- **Format:** `bun run format`

---

## Project Structure

- `src/` — TypeScript source code
- `test/` — Unit tests
- `PLAN.md` — Architecture and implementation plan
- `TODO.md` — Task breakdown and progress tracking

---

## Contributing

Contributions are welcome! Please see `PLAN.md` and `TODO.md` for project direction and open tasks.

---

## License

MIT