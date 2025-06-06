- [x] Regex test extractor now outputs JSON with coverage for: `compile`, `escape`, `findall`, `finditer`, `fullmatch`, `match`, `search`, `split`, `splititer`, `sub`, `subf`, `subfn`, `subn`
- [x] Constants, error types, and some flags/classes (e.g., `regex.I`, `regex.BESTMATCH`, etc.) are not included, as they are not direct function calls or not serializable
- [x] All tests with Python `bytes` objects are skipped (see README Known Issues)
# Pyrex Project TODO

## Completed Tasks ✅

### 2025-06-06: Clean Slate Testing and Issue Collection (Debug Mode)
- **Phase 1: Clean Slate Preparation** ✅
  - Deleted existing analysis files (`ISSUE.md`, `PLAN.md`, `TODO.md`)
  - Started fresh analysis approach

- **Phase 2: Test Execution and Failure Collection** ✅
  - Confirmed fail-fast configuration working correctly (`--bail 1`)
  - Executed multiple test runs to validate consistent failure patterns
  - Identified primary blocking failure in JSON test parser
  - Collected comprehensive test execution data and timing analysis

- **Phase 3: Comprehensive Issue Documentation** ✅
  - Created detailed `ISSUE.md` with systematic categorization:
    - **Critical/Blocking**: 1 issue affecting 1515+ tests
    - **Test Framework**: 2 issues around test organization
    - **Implementation**: 3 issues with varying priorities  
    - **Dependencies**: 2 issues related to Pyodide and data files
    - **Configuration**: 1 issue (confirmed working correctly)
  - Documented test execution evidence and failure patterns
  - Provided priority matrix and resolution recommendations

### Key Findings:
- **Total Test Coverage**: 1529 tests across 3 test files
- **Primary Blocker**: Incomplete JSON test pattern parser missing `regex.sub()` support
- **Test Health**: 19 tests passing, fail-fast stopping at first failure as designed
- **Performance Impact**: 3+ second Pyodide initialization overhead

---

## Next Priority Tasks 🎯

### P0 - Critical (Blocks 1515+ tests)
- [ ] Implement missing JSON test pattern parsers:
  - [ ] `regex.sub()` pattern matching
  - [ ] `regex.subn()` pattern matching
  - [ ] `regex.split()` pattern matching
  - [ ] `regex.findall()` pattern matching
  - [ ] `regex.finditer()` pattern matching
  - [ ] `assertRaisesRegex()` exception handling

### P1 - High Priority
- [ ] Validate parser implementation against full JSON test dataset
- [ ] Test pattern parser with complex assertion types
- [ ] Add comprehensive error handling to test parser

### P2 - Medium Priority
- [ ] Consolidate and clarify test data file relationships
- [ ] Optimize Pyodide initialization for faster test execution
- [ ] Add missing test categories (error handling, performance, environment differences)

### P3 - Low Priority
- [ ] Enhance Python compatibility tests with edge cases
- [ ] Add performance benchmarking tests
- [ ] Implement browser/Node.js environment differential testing

---

## Status
**Current State**: Test coverage analysis complete.
**Next Mode**: Switch to Code mode for implementation.
**Files Updated**: `PLAN.md`, `TODO.md`

### 2025-06-06: Test Coverage Analysis (Architect Mode)
- **Analyzed current test coverage situation for Pyrex regex library project.** ✅
  - Read and understood project structure by examining `README.md`, `PLAN.md`, `TODO.md`, and `ISSUE.md`.
  - Analyzed current test files: `test/utils/test-regex.py` and `test/utils/pyodide_regex_tests.json`.
  - Reviewed test coverage data provided by the user showing regex method usage counts.
  - Compared current test coverage against the regex specification to identify gaps.
  - Created a comprehensive analysis report, including:
    - Summary of the current test coverage state.
    - List of regex methods/features that are under-tested or missing tests.
    - Prioritized recommendations for improving test coverage.
    - Specific areas that need attention based on the usage counts provided.
  - Incorporated the analysis report into `PLAN.md`.