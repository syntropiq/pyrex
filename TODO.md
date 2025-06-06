- Implemented dynamic test runner in [`test/pyodide-json.test.ts`](test/pyodide-json.test.ts) to execute regex tests from [`test/utils/extracted-regex-tests.json`](test/utils/extracted-regex-tests.json) using Vitest.
# TODO

## Current Tasks

*   Implement unit tests based on `pyodide_regex_tests.json`.
    *   Create `test/pyodide-json.test.ts` to dynamically generate tests.
    *   Load `pyodide_regex_tests.json` and iterate through test cases.
    *   Categorize tests by function (`sub`, `split`, `findall`, `match`, `search`, `fullmatch`, `escape`).
    *   Dynamically create Vitest `describe` and `it` blocks.
    *   Import `re` module from `src/index.ts`.
    *   Call appropriate `re` functions with `pattern` and `input`.
    *   Handle `is_bytes` conversion for input.
    *   Perform assertions against `expected` values.
    *   Implement error handling for unexpected errors.
    *   Leverage `test/utils/test-helpers.ts` for common tasks.
    *   Update `test/test-runner.ts` to include `test/pyodide-json.test.ts`.

## Completed Tasks

*   Created `PLAN.md` outlining the strategy for unit testing with `pyodide_regex_tests.json`.