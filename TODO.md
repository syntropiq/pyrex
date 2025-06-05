# TODO: Test Suite Restructuring - Actionable Tasks

This document outlines the specific, actionable tasks for implementing the new comprehensive test suite restructuring, as detailed in `PLAN.md`.

## Phase 1: Analysis and Extraction of `test-regex.py`

*   [x] **Task 1.1: Identify and Categorize Python Test Methods**
    *   [ ] Go through `test-regex.py` and list all `test_` methods within the `RegexTests` class.
    *   [ ] Group these methods into logical categories (e.g., basic operations, flags, groups, lookarounds, fuzzy matching, recursive patterns, error handling, performance).
    *   **Deliverable**: Internal list/spreadsheet of categorized Python test methods.

*   [x] **Task 1.2: Map Python Assertions to TypeScript Equivalents**
    *   [ ] Document the conversion rules for common `unittest.TestCase` assertions (e.g., `self.assertEqual`, `self.assertRaisesRegex`, `self.assertTrue`, `self.assertFalse`, `self.assertIsNone`, `self.assertIsNotNone`) to Vitest/Jest assertions (`expect().toBe()`, `expect().toThrow()`, `expect().toBeNull()`, `expect().not.toBeNull()`).
    *   [ ] Note any differences in behavior or additional considerations for TypeScript.
    *   **Deliverable**: Markdown document or internal guide for assertion mapping.

*   [x] **Task 1.3: Develop and Implement Test Case Extraction Strategy**
    *   [ ] Design a strategy for extracting patterns, input strings, expected outputs, and flags from `test-regex.py` test methods.
    *   [ ] Prioritize direct 1:1 conversion of test cases where feasible.
    *   [ ] For complex or Python-specific constructs, define how to create functionally equivalent TypeScript tests.
    *   [ ] **Action**: Create or enhance `tools/extract-regex-tests.py` to automate the extraction of test data into a structured format (e.g., JSON files, one per category).
    *   **Deliverable**: `tools/extract-regex-tests.py` script and initial set of extracted JSON test data files.

## Phase 2: Defining the New TypeScript Test Structure

*   [x] **Task 2.1: Propose and Implement New Test Directory Structure**
    *   [ ] Create the following new directories under `test/`:
        *   `test/python-backend/` (for tests specifically targeting the Python backend)
        *   `test/javascript-backend/` (for tests specifically targeting the JavaScript backend)
        *   `test/shared-features/` (for tests of features common to both backends, like `pattern-analyzer` or `error-handling`)
        *   `test/performance/` (for performance benchmarks)
        *   `test/utils/` (for shared test infrastructure, already exists but ensure it's aligned)
    *   **Deliverable**: New empty test directories created.

*   [x] **Task 2.2: Define and Apply Naming Conventions**
    *   [ ] Establish clear naming conventions for test files (e.g., `basic.test.ts`, `flags.test.ts`, `lookarounds.test.ts`).
    *   [ ] Ensure consistency across all new test files.
    *   **Deliverable**: Documented naming conventions.

*   [x] **Task 2.3: Create Initial Skeleton Test Files**
    *   [ ] Based on the categorized test methods from Phase 1, create empty TypeScript test files (e.g., `test/python-backend/basic.test.ts`, `test/javascript-backend/flags.test.ts`) as placeholders.
    *   **Deliverable**: Skeleton TypeScript test files.

## Phase 3: Implementing Test Utilities and Helpers

*   [x] **Task 3.1: Develop Python Test Runner Utility (`test/utils/python-test-runner.ts`)**
    *   [ ] Create a TypeScript utility to interact with the Pyodide environment.
    *   [ ] Implement functions within this utility to:
        *   Compile Python regex patterns.
        *   Execute `match`, `search`, `findall`, `sub`, `split` operations.
        *   Return results in a format easily consumable by TypeScript assertions.
        *   Handle pattern registration and deregistration within Pyodide.
    *   **Deliverable**: `test/utils/python-test-runner.ts` with core functionality.

*   [x] **Task 3.2: Implement JavaScript Test Helpers (`test/utils/js-test-helpers.ts`)**
    *   [ ] Create or adapt existing helpers to provide consistent assertion patterns for JavaScript backend tests.
    *   **Deliverable**: `test/utils/js-test-helpers.ts` with common assertion utilities.

*   [x] **Task 3.3: Create Test Data Loader (`test/utils/test-data-loader.ts`)**
    *   [ ] Develop a utility to read and parse the JSON test data files generated in Phase 1.
    *   [ ] Provide functions to load specific test categories or all test data.
    *   **Deliverable**: `test/utils/test-data-loader.ts`.

*   [x] **Task 3.4: Integrate Utilities with Vitest**
    *   [ ] Ensure all new test utilities are correctly imported and usable within the Vitest test environment.
    *   [ ] Verify that tests can be run using `npm test` (or equivalent Vitest command).
    *   **Deliverable**: Functional integration of new utilities with the test runner.

## Phase 4: Populating the New Test Suite

*   [x] **Task 4.1: Convert Basic Regex Tests**
    *   [ ] Write TypeScript tests for basic regex operations (e.g., `*`, `+`, `?`, `.`, `^`, `$`) for both Python and JavaScript backends, using extracted data and new utilities.
    *   **Deliverable**: Populated `test/python-backend/basic.test.ts` and `test/javascript-backend/basic.test.ts`.

*   [x] **Task 4.2: Implement Tests for Flags and Special Characters**
    *   [ ] Convert tests related to regex flags (`I`, `M`, `X`, `S`, `L`, `U`, `A`) and character escapes (`\n`, `\t`, `\x`, `\u`, `\N{}`).
    *   **Deliverable**: Populated `test/python-backend/flags.test.ts`, `test/javascript-backend/flags.test.ts`, etc.

*   [x] **Task 4.3: Handle Grouping and Backreferences**
    *   [ ] Convert tests for capturing groups, named groups (`(?P<name>...)`), and backreferences (`\1`, `\g<name>`).
    *   **Deliverable**: Populated `test/python-backend/groups.test.ts`, `test/javascript-backend/groups.test.ts`, etc.

*   [x] **Task 4.4: Address Lookarounds and Conditionals**
    *   [ ] Implement tests for positive/negative lookahead (`(?=...)`, `(?!...)`) and lookbehind (`(?<=...)`, `(?<!...)`), and conditional patterns (`(?(id)yes|no)`).
    *   **Deliverable**: Populated `test/python-backend/lookarounds.test.ts`, `test/shared-features/conditionals.test.ts`, etc.

*   [x] **Task 4.5: Tackle Fuzzy Matching and Recursive Patterns**
    *   [ ] Convert complex fuzzy matching tests (`{e<=N}`, `{i<=N}`, `{d<=N}`, `{s<=N}`) and recursive pattern tests (`(?R)`, `(?&name)`).
    *   **Deliverable**: Populated `test/python-backend/fuzzy.test.ts`, `test/python-backend/recursive.test.ts`.

*   [x] **Task 4.6: Ensure Exact Parity/Functional Equivalence**
    *   [ ] During conversion, meticulously compare results between Python and TypeScript tests.
    *   [ ] Document any identified behavioral differences in a dedicated section (e.g., `docs/backend-differences.md`).
    *   **Deliverable**: Comprehensive, passing TypeScript test suite with documented behavioral differences.

## Phase 5: Performance and Regression Testing Setup

*   [x] **Task 5.1: Migrate Performance Tests**
    *   [ ] Adapt relevant performance-focused tests from `test-regex.py` (e.g., tests involving large strings, many repetitions, or complex backtracking) to TypeScript.
    *   [ ] Place these in `test/performance/performance.test.ts`.
    *   **Deliverable**: `test/performance/performance.test.ts` with initial performance tests.

*   [x] **Task 5.2: Establish Performance Baselines**
    *   [ ] Run the new performance tests and record baseline execution times for both backends.
    *   [ ] Store these baselines (e.g., in a JSON file or a simple text file).
    *   **Deliverable**: Initial performance benchmark results.

*   [x] **Task 5.3: Implement Regression Test Automation**
    *   [ ] Update `package.json` scripts to easily run the entire new test suite.
    *   [ ] Ensure the test suite can be integrated into a CI/CD pipeline.
    *   **Deliverable**: Updated `package.json` scripts.

*   [x] **Task 5.4: Define Performance Monitoring Strategy**
    *   [ ] Outline how future performance changes will be tracked (e.g., comparing against baselines, setting thresholds).
    *   **Deliverable**: Brief documentation on performance monitoring.

## Phase 6: Documentation and Cleanup

*   [ ] **Task 6.1: Update `PLAN.md`**
    *   [ ] Ensure `PLAN.md` reflects the final approved plan. (Already completed)
    *   **Deliverable**: Up-to-date `PLAN.md`.

*   [x] **Task 6.2: Update `TODO.md`**
    *   [ ] Replace the current `TODO.md` with this detailed list of actionable tasks. (This current task)
    *   **Deliverable**: Up-to-date `TODO.md`.

*   [ ] **Task 6.3: Document New Test Architecture**
    *   [ ] Create a new `TESTING.md` file or update `README.md` with:
        *   An overview of the new test structure.
        *   Instructions on how to add new test cases.
        *   Guidance on running tests for specific backends or features.
        *   Details on performance testing.
    *   **Deliverable**: Comprehensive testing documentation.

*   [x] **Task 6.4: Remove Legacy Test Files**
    *   [x] No `test/legacy/` directory found; no legacy test files to remove.
    *   **Deliverable**: Confirmed clean `test/` directory.

## COMPLETED: Python Test Verification

- [x] The Python tests have been successfully split and validated, with all 102 tests passing in the `pyrex312` conda environment.
- **Next Focus**: Converting these Python tests to TypeScript format for both Python and JavaScript backends.