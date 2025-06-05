# New Test Architecture

## Overview
This project uses a multi-directory approach under `test/` to separate concerns:

- [`test/python-backend/`](test/python-backend/:1): Python-specific tests.
- [`test/javascript-backend/`](test/javascript-backend/:1): JavaScript-specific tests.
- [`test/shared-features/`](test/shared-features/:1): Tests for functionality shared by both backends.
- [`test/performance/`](test/performance/:1): Performance benchmarks and efficiency-focused tests.
- [`test/utils/`](test/utils/:1): Shared utilities and test helpers referenced by all other tests.

## Adding New Test Cases
1. Determine which backend (Python, JavaScript, or both) or shared feature the test covers.
2. Place corresponding `.test.ts` files in the appropriate directory (e.g., `test/python-backend/` for Python).
3. Follow naming conventions (e.g., `basic.test.ts`, `flags.test.ts`).
4. Use helpers from [`test/utils/`](test/utils/:1) for consistent setup, data loading, or assertion logic.

## Running Tests
- Run all tests:  
  ```bash
  npm test
  ```
- Run only Python-backend tests (example using a pattern filter):  
  ```bash
  npm test -- python-backend
  ```
- Run only JavaScript-backend tests similarly:
  ```bash
  npm test -- javascript-backend
  ```
- Check your test framework’s docs for additional filtering or watch options.

## Performance Testing
1. Performance-related tests reside in [`test/performance/`](test/performance/:1).
2. Execute them (often as part of `npm test`) to collect baseline metrics.
3. Track changes in test execution time for each run to monitor regressions or improvements.