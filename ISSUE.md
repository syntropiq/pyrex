# Issues

## Open Issues

*   **Dynamic Unit Testing for `pyrex`:** The current testing approach requires manual creation of unit tests. A significant number of regex test patterns are available in `pyodide_regex_tests.json` which are currently underutilized.
    *   **Impact:** Slow and error-prone test creation, potential for missed test cases, difficulty in maintaining parity with Python's `re` module behavior.
    *   **Proposed Solution:** Implement a dynamic test generation mechanism that reads `pyodide_regex_tests.json` and automatically creates Vitest unit tests. This will streamline the testing process, improve test coverage, and ensure consistency with Python's regex behavior.
    *   **Status:** Plan created and approved. Ready for implementation.