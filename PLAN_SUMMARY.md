# Comprehensive Test Suite Restructuring: Next Steps

## 1. Finalize Extraction
Use [`tools/extract-regex-tests.py`](tools/extract-regex-tests.py:1) to generate structured JSON from `test-regex.py` data.

## 2. New Test Structure
Create directories under [`test/`](test/:1) for:
- [`python-backend/`](test/python-backend/:1)
- [`javascript-backend/`](test/javascript-backend/:1)
- [`shared-features/`](test/shared-features/:1)
- [`performance/`](test/performance/:1)
- [`utils/`](test/utils/:1)

## 3. Implement Test Utilities
- [`python-test-runner.ts`](test/utils/python-test-runner.ts:1) for Pyodide-based Python tests.
- [`js-test-helpers.ts`](test/utils/js-test-helpers.ts:1) for JavaScript regex/assertions.
- [`test-data-loader.ts`](test/utils/test-data-loader.ts:1) for loading JSON test data.

## 4. Populate Tests
Convert Python regex tests to TypeScript. Verify parity or document differences between backends.

## 5. Performance & Regression
Add performance tests in [`test/performance/`](test/performance/:1), establish baselines, update CI for regression checks.

## 6. Documentation & Cleanup
- Update docs (`PLAN.md`, `TODO.md`, `README.md`).
- Remove legacy tests once replacements pass.

```mermaid
flowchart LR
    A(Extract) --> B(Structure)
    B --> C(Utilities)
    C --> D(Convert Tests)
    D --> E(Perf & Regression)
    E --> F(Documentation & Cleanup)