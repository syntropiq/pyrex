### Regex Test Extraction Coverage (2025-06-06)

- Extractor now outputs JSON with these regex function types: `compile`, `escape`, `findall`, `finditer`, `fullmatch`, `match`, `search`, `split`, `splititer`, `sub`, `subf`, `subfn`, `subn`.
- Constants, error types, and some flags/classes (e.g., `regex.I`, `regex.BESTMATCH`, etc.) are not included, as they are not direct function calls or not serializable.
- All tests with Python `bytes` objects are skipped (see README Known Issues).
## Strategic PLAN Development

### Executive Summary

The recent comprehensive clean slate testing has provided a clear picture of the current state of the Pyrex project's test suite. A critical blocking issue, `CRITICAL-001: Incomplete JSON Test Pattern Parser`, is preventing the execution of over 1500 tests. This plan outlines a systematic approach to resolve this and other identified issues, prioritizing foundational fixes before moving to broader improvements and optimizations. The goal is to establish a robust and reliable testing framework that accurately reflects the project's functionality and performance.

### Issue Resolution Strategy

Our strategy is to tackle issues in a prioritized, phased approach, focusing on unblocking critical paths first.

1.  **Unblock Critical Path:** Address the incomplete JSON test parser (`IMPL-001`) to enable full execution of the extensive JSON test suite. This is paramount as it directly impacts our ability to validate core functionality.
2.  **Stabilize Test Infrastructure:** Improve test data consistency (`FRAMEWORK-001`, `DEP-002`) and optimize Pyodide initialization (`DEP-001`) to create a more efficient and reliable testing environment.
3.  **Enhance Test Coverage & Validation:** Systematically add missing test categories (`FRAMEWORK-002`) and strengthen existing validation tests (`IMPL-002`, `IMPL-003`) to improve overall test robustness and catch edge cases.
4.  **Continuous Optimization:** Implement ongoing performance tuning and maintenance to ensure long-term project health.

### Phase-based Implementation Plan

The resolution will proceed through four distinct phases:

#### Phase 1: Foundation & Critical Unblocking

*   **Focus:** Resolving the primary blocking issue and enabling full test suite execution.
*   **Objectives:**
    *   Implement comprehensive parsing for all missing Python assertion patterns in `test/pyodide-json.test.ts`.
    *   Ensure all 1515+ JSON-derived Python regex tests can execute without "Unsupported assertion" errors.
*   **Deliverables:**
    *   Updated `test/pyodide-json.test.ts` with handlers for `regex.sub()`, `regex.subn()`, `regex.split()`, `regex.findall()`, `regex.finditer()`, and `assertRaisesRegex()`.
    *   Successful execution of the entire JSON test suite.
*   **Prerequisites:** Completion of `ISSUE.md` analysis.
*   **Dependencies:** Direct dependency on the `test/pyodide-json.test.ts` file and the core `src/backends/python.ts` implementation.
*   **Estimated Complexity:** High. Requires deep understanding of Python regex behavior and careful TypeScript implementation.
*   **Risk Factors:**
    *   Misinterpretation of complex Python regex behaviors or assertion types.
    *   Unforeseen edge cases within the extensive JSON test dataset.
    *   Potential for introducing new bugs during parser implementation.
*   **Success Metrics:**
    *   All 1515+ tests in `test/pyodide-json.test.ts` pass.
    *   No "Unsupported assertion" errors are reported during test execution.

#### Phase 2: Test Infrastructure Refinement & Performance Optimization

*   **Focus:** Improving the efficiency and maintainability of the testing environment.
*   **Objectives:**
    *   Consolidate and clarify the relationship between `extracted-regex-tests.json` and `pyodide_regex_tests.json`.
    *   Significantly reduce Pyodide initialization overhead during test runs.
*   **Deliverables:**
    *   A single, well-defined source for JSON test data, or clear documentation on the purpose of each file.
    *   Optimized Pyodide loading or test execution strategy to minimize startup time.
*   **Prerequisites:** Phase 1 complete.
*   **Dependencies:** `FRAMEWORK-001`, `DEP-001`, `DEP-002`.
*   **Estimated Complexity:** Medium.
*   **Risk Factors:**
    *   Challenges in merging or deprecating test data files without losing coverage.
    *   Limitations in Pyodide's initialization process that prevent significant optimization.
*   **Success Metrics:**
    *   Clear documentation or consolidation of test data files.
    *   Pyodide initialization time reduced by at least 50% (e.g., from ~3 seconds to ~1.5 seconds or less).

#### Phase 3: Comprehensive Test Coverage & Validation

*   **Focus:** Expanding test coverage and enhancing the robustness of existing validation tests.
*   **Objectives:**
    *   Add new test categories for error handling (RegexError), performance/timeout, and environment differences (Browser vs. Node.js).
    *   Enhance Python compatibility tests with more complex scenarios and flag combinations.
    *   Improve seamless API tests with error boundary and complex Python-only pattern edge cases.
*   **Deliverables:**
    *   New test files or sections covering error handling, performance, and environment-specific behaviors.
    *   Expanded test cases in `test/validation/python-compatibility.test.ts` and `test/validation/seamless-async-api.test.ts`.
*   **Prerequisites:** Phase 1 and 2 complete.
*   **Dependencies:** `FRAMEWORK-002`, `IMPL-002`, `IMPL-003`.
*   **Estimated Complexity:** Medium.
*   **Risk Factors:**
    *   Difficulty in identifying all relevant edge cases for new test categories.
    *   Ensuring new tests are truly comprehensive without becoming redundant.
*   **Success Metrics:**
    *   Increased overall test coverage (if measurable).
    *   Discovery of new bugs or inconsistencies through enhanced testing.
    *   Clear performance benchmarks established.

#### Phase 4: Optimization & Maintenance

*   **Focus:** Ongoing improvements, performance tuning, and ensuring long-term project health.
*   **Objectives:**
    *   Continuously monitor and optimize performance of the Pyrex library and its test suite.
    *   Refactor and clean up code as needed.
    *   Maintain up-to-date documentation.
*   **Deliverables:**
    *   Regular performance reports and identified areas for optimization.
    *   Clean, well-documented codebase.
    *   Streamlined CI/CD processes.
*   **Prerequisites:** All previous phases complete.
*   **Dependencies:** None specific, ongoing effort.
*   **Estimated Complexity:** Low to Medium (continuous effort).
*   **Risk Factors:**
    *   Scope creep during optimization efforts.
    *   Neglecting documentation updates.
*   **Success Metrics:**
    *   Consistent or improved performance metrics over time.
    *   High code quality and maintainability scores.
    *   Reduced technical debt.

### Risk Mitigation

*   **Critical Blocker (JSON Parser):**
    *   **Strategy:** Break down the parser implementation into smaller, manageable sub-tasks (e.g., one assertion type at a time). Implement robust unit tests specifically for the parser logic.
    *   **Fallback:** If a specific assertion type proves overly complex, consider a temporary workaround or a phased rollout for that specific pattern, while still unblocking the majority of tests.
*   **Pyodide Performance:**
    *   **Strategy:** Investigate Pyodide's API for potential pre-initialization or caching mechanisms. Explore alternative test runners or environments that might offer better performance.
    *   **Fallback:** If significant performance gains are not achievable, document the limitation and explore strategies like parallel test execution or selective test runs for CI.
*   **Test Data Inconsistency:**
    *   **Strategy:** Conduct a thorough audit of both JSON files to identify unique and overlapping test cases. Develop a clear migration plan to consolidate or define distinct roles for each file.
    *   **Fallback:** If full consolidation is not feasible, create clear documentation outlining the purpose and usage of each test data file to prevent future confusion.
*   **Missing Test Categories:**
    *   **Strategy:** Prioritize new test categories based on perceived risk and impact. Leverage existing Python regex documentation and common pitfalls to inform test case creation.
    *   **Fallback:** If resources are limited, focus on the most critical missing categories first (e.g., error handling) and defer less critical ones.

### Success Criteria

*   **Phase 1:** All 1515+ JSON-derived Python regex tests pass successfully, indicating the complete functionality of the JSON test pattern parser.
*   **Phase 2:** Test data sources are clearly defined and consistent, and Pyodide initialization time is significantly reduced (e.g., by 50%).
*   **Phase 3:** New test categories are implemented, and existing compatibility and API tests are enhanced, leading to a more robust and comprehensive test suite.
*   **Overall:** A stable, efficient, and comprehensive test suite that provides high confidence in the Pyrex library's functionality and performance across different environments.

### Resource Requirements

*   **Tools:** Existing development environment (VS Code, TypeScript, Vitest, Pyodide).
*   **Skills:** Strong proficiency in TypeScript, Python, regular expressions, and test-driven development. Familiarity with Pyodide and its integration.
*   **Approaches:** Test-driven development (TDD) for new parser implementations, performance profiling tools for Pyodide optimization, systematic test case generation.

---

```mermaid
graph TD
    A[Start: Issue Analysis Complete] --> B{Phase 1: Foundation & Critical Unblocking};
    B --> B1[Implement Missing JSON Parser Handlers];
    B1 --> B2[Validate Parser Against Full JSON Suite];
    B2 --> C{Phase 2: Test Infrastructure Refinement & Performance Optimization};
    C --> C1[Consolidate Test Data Sources];
    C1 --> C2[Optimize Pyodide Initialization];
    C2 --> D{Phase 3: Comprehensive Test Coverage & Validation};
    D --> D1[Add New Test Categories];
    D1 --> D2[Enhance Existing Validation Tests];
    D2 --> E{Phase 4: Optimization & Maintenance};
    E --> E1[Continuous Performance Tuning];
    E1 --> E2[Code Cleanup & Documentation];
    E2 --> F[End: Robust Test Suite];

    subgraph Issues Addressed
        B1 --> IMPL001[IMPL-001: JSON Test Parser Incomplete];
        B2 --> CRIT001[CRITICAL-001: Incomplete JSON Test Parser];
        C1 --> FRAME001[FRAMEWORK-001: Inconsistent Test Data];
        C1 --> DEP002[DEP-002: Test Data File Dependencies];
        C2 --> DEP001[DEP-001: Pyodide Initialization Overhead];
        D1 --> FRAME002[FRAMEWORK-002: Missing Test Categories];
        D2 --> IMPL002[IMPL-002: Python Compatibility Validation];
        D2 --> IMPL003[IMPL-003: Seamless API Edge Cases];
    end

## Test Coverage Analysis Report for Pyrex Regex Library

### 1. Summary of the Current Test Coverage State

The Pyrex project aims to provide a Python-like `re` interface for regex operations in TypeScript, leveraging Pyodide for Python-only features. The current test suite consists of **1529 tests** across three files, with a significant portion (1515+ tests) derived from a JSON test suite (`test/utils/pyodide_regex_tests.json`).

However, a critical blocking issue, `CRITICAL-001: Incomplete JSON Test Pattern Parser`, is preventing the full execution of these 1515+ JSON-derived tests. The parser in `test/pyodide-json.test.ts` currently only handles `regex.search().span()` and `regex.match() === None` patterns, while `regex.sub()`, `regex.subn()`, `regex.split()`, `regex.findall()`, `regex.finditer()`, and `assertRaisesRegex()` patterns are not yet implemented. This severely limits the actual test coverage data available for these methods.

The provided test coverage data, while useful, reflects the usage in currently *passing* or *partially executed* tests. Once the JSON test parser is fully implemented, the coverage for many methods is expected to increase significantly.

**Current Method Usage Counts (as provided by the user):**

*   **High Coverage:**
    *   `regex.match`: 492
    *   `regex.search`: 393
    *   `regex.findall`: 226
    *   `regex.sub`: 112
    *   `regex.compile`: 101
*   **Medium Coverage:**
    *   `regex.error`: 76
    *   `regex.fullmatch`: 68
    *   `regex.split`: 53
    *   `regex.finditer`: 37
*   **Lower Coverage (Flags/Functions):**
    *   `regex.I` (flag): 33
    *   `regex.escape`: 24
    *   `regex.BESTMATCH` (flag): 19
    *   `regex.V1` (flag): 15
    *   `regex.UNICODE` (flag): 13
    *   `regex.splititer`: 13
    *   `regex.M` (flag): 8
    *   `regex.X` (flag): 7
    *   `regex.IGNORECASE` (flag): 7
    *   `regex.U` (flag): 5
    *   `regex.ASCII` (flag): 5
    *   `regex.LOCALE` (flag): 4
    *   `regex.DOTALL` (flag): 4
    *   `regex.FULLCASE` (flag): 3
    *   `regex.S` (flag): 2
    *   `regex.MULTILINE` (flag): 2
    *   `regex.L` (flag): 2
    *   `regex.ENHANCEMATCH` (flag): 2
    *   `regex.DEFAULT_VERSION` (flag): 2
    *   `regex.WORD` (flag): 1
    *   `regex.VERBOSE` (flag): 1
    *   `regex.V0` (flag): 1
    *   `regex.DEBUG` (flag): 1
    *   `regex.B` (flag): 1
    *   `regex.A` (flag): 1
*   **Minimal Coverage (Functions/Classes):**
    *   `regex.subf`: 8
    *   `regex.subn`: 5
    *   `regex.subfn`: 2
    *   `regex.Scanner`: 1
    *   `regex.Pattern`: 1

### 2. List of Regex Methods/Features that are Under-tested or Missing Tests

Based on the provided usage counts and the project's stated goal of mirroring Python's `re` module (which includes the `regex` package), the following methods and features are identified as under-tested or missing comprehensive tests:

*   **Core Methods with Incomplete JSON Parser Support (High Priority for Expansion):**
    *   `regex.sub()`: Although it has 112 usages, the `ISSUE.md` explicitly states that `regex.sub()` patterns are currently throwing "Unsupported assertion" errors in the JSON test suite. This indicates that the existing tests for `sub()` are not fully executing or validating its behavior as intended.
    *   `regex.subn()`: Listed as "MISSING" in `ISSUE.md` for the JSON parser.
    *   `regex.split()`: Listed as "MISSING" in `ISSUE.md` for the JSON parser.
    *   `regex.findall()`: Although it has 226 usages, it's listed as "MISSING" in `ISSUE.md` for the JSON parser, suggesting that many of its intended tests are not running.
    *   `regex.finditer()`: Listed as "MISSING" in `ISSUE.md` for the JSON parser.
    *   `assertRaisesRegex()`: Listed as "MISSING" in `ISSUE.md` for the JSON parser, indicating a lack of proper exception handling tests.

*   **Methods/Classes with Minimal Coverage (High Priority for New Tests):**
    *   `regex.subf` (8 usages): This function likely provides advanced substitution capabilities and needs more dedicated test cases.
    *   `regex.subfn` (2 usages): Similar to `subf`, this function is barely tested.
    *   `regex.Scanner` (1 usage): This class is critical for tokenizing regular expressions. A single test is insufficient to cover its various functionalities and edge cases.
    *   `regex.Pattern` (1 usage): Represents a compiled regular expression. Its methods and properties need thorough testing beyond a single usage.

*   **Flags with Lower Coverage (Medium Priority for Expansion):**
    *   `regex.I` (IGNORECASE): 33 usages. While present, more tests specifically targeting case-insensitive matching with various patterns and locales would be beneficial.
    *   `regex.BESTMATCH` (19 usages): This flag influences how the regex engine finds the "best" match. More diverse scenarios are needed to ensure its correctness.
    *   `regex.V1` (15 usages): This flag relates to different regex versions/syntaxes. Comprehensive tests for its specific behaviors are crucial.
    *   Other flags with low usage (e.g., `regex.UNICODE`, `regex.M`, `regex.X`, `regex.IGNORECASE`, `regex.U`, `regex.ASCII`, `regex.LOCALE`, `regex.DOTALL`, `regex.FULLCASE`, `regex.S`, `regex.MULTILINE`, `regex.L`, `regex.ENHANCEMATCH`, `regex.DEFAULT_VERSION`, `regex.WORD`, `regex.VERBOSE`, `regex.V0`, `regex.DEBUG`, `regex.B`, `regex.A`).

*   **Other Potentially Under-tested Areas (as identified in `ISSUE.md`):**
    *   **Error handling tests (RegexError class):** Explicitly mentioned as a missing test category.
    *   **Performance/timeout tests:** Crucial for a library that aims for optimal performance.
    *   **Browser vs Node.js environment differences:** Important for ensuring consistent behavior across target environments.
    *   **Pattern analysis validation tests:** To ensure the internal pattern analysis (`src/utils/pattern-analyzer.ts`) is robust.
    *   **Backend selection logic tests:** To verify that the automatic backend selection (JavaScript vs. Pyodide) works correctly under various conditions.
    *   **Complex tuple/list return value assertions:** Partially implemented, indicating a need for more comprehensive testing of complex return types.
    *   **Python compatibility tests:** While 7/7 pass, `ISSUE.md` suggests they "may be too simple to catch edge cases" and lack "comprehensive flag combination testing."
    *   **Seamless API tests:** While 6/6 pass, `ISSUE.md` notes missing "error boundary testing," "complex Python-only pattern edge cases," and "performance characteristics validation."

### 3. Prioritized Recommendations for Improving Test Coverage

The recommendations are prioritized to align with the existing `PLAN.md` and `TODO.md`, focusing on unblocking critical paths first, and then following the user's suggested priority based on usage counts.

#### P0 - Critical: Unblock JSON Test Suite

*   **Implement Missing JSON Test Pattern Parsers:**
    *   Develop comprehensive parsing and assertion handling for `regex.sub()`, `regex.subn()`, `regex.split()`, `regex.findall()`, `regex.finditer()`, and `assertRaisesRegex()` within `test/pyodide-json.test.ts`. This is the absolute highest priority as it will immediately enable over 1500 existing tests to run, providing a much clearer picture of the actual coverage.

#### P1 - High Priority: Expand Core Method Coverage (Based on Usage)

*   **`regex.match` and `regex.search`:** While having high usage, ensure that once the JSON parser is fixed, all their intended test cases are running and passing. Review for any complex scenarios or edge cases that might still be missing.
*   **`regex.findall`:** Similar to `match` and `search`, ensure full execution of its JSON-derived tests. Develop additional tests for various group capturing scenarios, overlapping matches, and different flag combinations.
*   **`regex.sub`:** Focus on comprehensive testing of `regex.sub()` with various replacement patterns (including backreferences, named groups, and special escapes), different `count` arguments, and callable replacements.
*   **`regex.compile`:** Test `regex.compile()` with a wide range of patterns, including those with different flags, named groups, and complex syntax. Verify that compiled patterns behave as expected when used with other `regex` methods.
*   **`regex.error` and `assertRaisesRegex()`:** Implement dedicated tests to ensure that `regex.error` is raised correctly for all documented error conditions (e.g., invalid regex syntax, invalid group references, incompatible flags).

#### P2 - Medium Priority: Deepen Coverage for Less Used Features & Infrastructure

*   **`regex.fullmatch`:** Add more tests for `regex.fullmatch()` to cover cases where the entire string must match the pattern, including edge cases with empty strings, patterns with anchors, and patterns with optional components.
*   **`regex.split` and `regex.finditer`:** Develop new, dedicated test cases for these methods, covering various inputs, edge cases, and flag combinations, leveraging the `test/utils/test-regex.py` as a reference for Python's behavior.
*   **`regex.I`, `regex.escape`, `regex.BESTMATCH`, `regex.V1`, `regex.UNICODE`, `regex.splititer`, `regex.M`, `regex.X`, `regex.IGNORECASE`, `regex.U`, `regex.ASCII`, `regex.LOCALE`, `regex.DOTALL`, `regex.FULLCASE`, `regex.S`, `regex.MULTILINE`, `regex.L`, `regex.ENHANCEMATCH`, `regex.DEFAULT_VERSION`, `regex.WORD`, `regex.VERBOSE`, `regex.V0`, `regex.DEBUG`, `regex.B`, `regex.A`:** Create new test cases that specifically combine these flags with various regex patterns and operations to ensure their correct interaction and behavior.
*   **`regex.subf` and `regex.subfn`:** Implement extensive tests for these functions, covering various input types, patterns, and expected outputs. This includes testing with different callback functions, replacement strings, and edge cases.
*   **`regex.Scanner` and `regex.Pattern` Tests:** Implement extensive tests for the `Scanner` class (if exposed or internally used in a testable way) and the `Pattern` object's properties and methods (e.g., `pattern`, `flags`, `groups`, `groupindex`).
*   **Performance/Timeout Tests:** Introduce tests to measure the performance of regex operations and identify potential timeout issues, especially for complex patterns or large inputs.
*   **Browser vs. Node.js Environment Tests:** Implement tests to verify consistent behavior of the Pyrex library in both browser and Node.js environments, particularly for features that might have subtle differences.

#### P3 - Low Priority: Refine Existing Coverage & Edge Cases

*   **Enhance Python Compatibility Tests:** Review and expand `test/validation/python-compatibility.test.ts` with more complex scenarios, including advanced regex features and flag combinations, to ensure full compatibility with Python's `regex` module.
*   **Improve Seamless API Tests:** Add error boundary testing and more complex Python-only pattern edge cases to `test/validation/seamless-async-api.test.ts` to ensure the API handles all scenarios gracefully.
*   **Pattern Analysis and Backend Selection Logic Tests:** Develop tests to validate the internal logic of `src/utils/pattern-analyzer.ts` and the automatic backend selection mechanism.

### 4. Specific Areas that Need Attention Based on Usage Counts

Based on the provided usage counts, the following areas require immediate and focused attention for test development:

*   **`regex.subf` (8 usages) and `regex.subfn` (2 usages):** These functions have extremely low coverage. It is critical to understand their intended functionality and implement a comprehensive suite of tests covering various input types, patterns, and expected outputs. This includes testing with different callback functions, replacement strings, and edge cases.
*   **`regex.Scanner` (1 usage):** A single test for `regex.Scanner` is insufficient. This class likely involves parsing and tokenizing regex patterns, which is a complex process prone to errors. New tests should cover:
    *   Basic scanning of valid patterns.
    *   Scanning of invalid or malformed patterns to ensure proper error handling.
    *   Edge cases like empty patterns, patterns with only flags, or very long patterns.
    *   Interaction with different regex flags.
*   **`regex.Pattern` (1 usage):** The `regex.Pattern` object represents a compiled regex. Tests should be added to verify:
    *   Correctness of its properties (`pattern`, `flags`, `groups`, `groupindex`).
    *   Behavior of any methods it exposes (e.g., `match`, `search`, `findall` when called on a compiled pattern).
    *   Serialization/deserialization if applicable.

By addressing the critical blocking issue first and then systematically expanding tests for these under-covered methods and flags, the Pyrex project can significantly improve its test coverage and ensure the robustness and reliability of its regex library.

---

**Mermaid Diagram: Test Coverage Improvement Plan Flow**

```mermaid
graph TD
    A[Start: Current Test Coverage State] --> B{Phase 0: Unblock JSON Test Suite};
    B --> B1[Implement Missing JSON Parser Handlers];
    B1 --> C{Phase 1: Expand Core Method Coverage};
    C --> C1[Validate regex.match() & search() after unblock];
    C1 --> C2[Comprehensive Tests for regex.findall()];
    C2 --> C3[Comprehensive Tests for regex.sub()];
    C3 --> C4[Comprehensive Tests for regex.compile()];
    C4 --> C5[Error Handling & assertRaisesRegex() Tests];
    C5 --> D{Phase 2: Deepen Coverage for Less Used Features};
    D --> D1[Extensive Tests for regex.fullmatch()];
    D1 --> D2[Comprehensive Tests for regex.split() & finditer()];
    D2 --> D3[Flag Combination Tests (I, BESTMATCH, V1, UNICODE, etc.)];
    D3 --> D4[Extensive Tests for regex.subf() & subfn()];
    D4 --> D5[Extensive Tests for regex.Scanner & regex.Pattern];
    D5 --> D6[Performance & Timeout Tests];
    D6 --> D7[Browser vs. Node.js Environment Tests];
    D7 --> E{Phase 3: Refine Existing Coverage & Edge Cases};
    E --> E1[Enhance Python Compatibility Tests];
    E1 --> E2[Improve Seamless API Tests];
    E2 --> E3[Pattern Analysis & Backend Selection Logic Tests];
    E3 --> F[End: Robust & Comprehensive Test Suite];

    subgraph Key Focus Areas
        B1 --> JSON_PARSER_FIX[CRITICAL-001: Incomplete JSON Test Pattern Parser];
        C1 --> MATCH_SEARCH[regex.match, regex.search];
        C2 --> FINDALL[regex.findall];
        C3 --> SUB[regex.sub];
        C4 --> COMPILE[regex.compile];
        C5 --> ERROR_ASSERT[regex.error, assertRaisesRegex()];
        D1 --> FULLMATCH[regex.fullmatch];
        D2 --> SPLIT_FINDITER[regex.split, regex.finditer];
        D3 --> FLAGS[Various Flags];
        D4 --> SUBF_SUBFN[regex.subf, regex.subfn];
        D5 --> SCANNER_PATTERN[regex.Scanner, regex.Pattern];
        D6 --> PERF_TIMEOUT[Performance/Timeout];
        D7 --> ENV_DIFF[Browser vs Node.js];
        E1 --> PY_COMPAT[Python Compatibility];
        E2 --> SEAMLESS_API[Seamless API];
        E3 --> PATTERN_ANALYSIS[Pattern Analysis/Backend Selection];
    end
```