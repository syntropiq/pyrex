# Plan for Unit Testing with pyodide_regex_tests.json

**Objective:** Create a robust unit testing mechanism that directly consumes `pyodide_regex_tests.json` to generate and execute tests for the `pyrex` library, minimizing manual test creation.

**Phase 1: Setup and Data Loading**

1.  **Create a new test file:** Create a new TypeScript file, e.g., `test/pyodide-json.test.ts`, to house the dynamically generated tests. This will keep the new tests separate and organized within the existing `test/` directory.
2.  **Load `pyodide_regex_tests.json`:** Import the `pyodide_regex_tests.json` file directly into the new test file. Since it's a JSON file, TypeScript will handle it as a module, allowing direct access to its contents.

**Phase 2: Dynamic Test Generation**

1.  **Iterate through test cases:** Loop through each test object within the imported JSON array.
2.  **Categorize tests by function:** Group tests by their `function` property (e.g., `sub`, `split`, `findall`, `match`, `search`, `fullmatch`, `escape`). This categorization will improve the organization and readability of test results in the test runner output.
3.  **Dynamically create `describe` blocks:** For each unique function category identified, create a `describe` block using Vitest's `describe` function. This will logically group related tests.
4.  **Dynamically create `it` blocks:** For each individual test case within a function category, create an `it` block. The test name will be constructed to be descriptive, possibly including the `method` and `line` number from the JSON data for easy traceability.

**Phase 3: Test Execution and Assertion**

1.  **Import `re` module:** Import the `re` module from `src/index.ts` into the new test file. This module provides the Python-like regex API that needs to be tested.
2.  **Call appropriate `re` function:** Inside each `it` block, dynamically call the corresponding `re` function (e.g., `re.sub`, `re.split`, `re.findall`) based on the `function` property of the current test case.
3.  **Pass `pattern` and `input`:** Use the `pattern` and `input` values extracted from the JSON test case as arguments to the invoked `re` function.
4.  **Handle `is_bytes`:** If the `is_bytes` flag is present and `true` in a test case, convert the `input` string to a `Uint8Array` or `Buffer` before passing it to the `re` function. This is crucial because Python's `re` module handles byte strings differently, and the `pyrex` library needs to correctly emulate this behavior. A helper function might be created for this conversion.
5.  **Perform assertions:** Compare the actual result returned by the `re` function call with the `expected` value from the JSON using Vitest's `expect` assertions.
    *   For `sub` and `findall`, the `expected` value is typically a string or an array of strings.
    *   For `split`, the `expected` value is an array of strings.
    *   For `match` and `search`, the `expected` value might be `null` or an object representing a match. This will require careful handling of the `MatchObject` structure returned by `pyrex`.

**Phase 4: Refinements and Integration**

1.  **Error Handling:** Implement basic error handling within the tests to catch and report any unexpected errors thrown by the `re` functions. If the JSON data includes test cases specifically designed to expect errors, these should also be asserted.
2.  **Test Helper Functions:** Create new or leverage existing test helper functions (e.g., from `test/utils/test-helpers.ts`) to simplify common tasks such as string-to-bytes conversion, deep comparison of complex results (like `MatchObject` instances), or standardized test case execution.
3.  **Update `test/test-runner.ts`:** Add the new `test/pyodide-json.test.ts` file to the `newUnitTests` array within `test/test-runner.ts`. This formally integrates the dynamically generated tests into the project's overall test migration strategy and ensures they are run as part of the standard test suite.
4.  **Update `TODO.md`:** Document the completion of this task in `TODO.md`, outlining the new test file and the approach taken.

**Mermaid Diagram:**

```mermaid
graph TD
    A[Start] --> B{Read pyodide_regex_tests.json};
    B --> C{Iterate through test cases};
    C --> D{Group tests by function (sub, split, findall, etc.)};
    D --> E{For each function group:};
    E --> F[Create Vitest 'describe' block];
    F --> G{For each test case:};
    G --> H[Create Vitest 'it' block];
    H --> I[Import 're' from src/index.ts];
    I --> J{Call re.function(pattern, input)};
    J --> K{Handle is_bytes conversion if needed};
    K --> L[Assert actual result against expected];
    L --> M{All tests processed?};
    M -- No --> G;
    M -- Yes --> N{All function groups processed?};
    N -- No --> E;
    N -- Yes --> O[Update TODO.md];
    O --> P[End];