# Pyrex Library Issues and Discrepancies

## Build Pipeline Status (Last Run: 2025-01-06)

### Build Command Status
✅ **PASSED** - `bun run build` (via npx vite build)
- Successfully creates dist/index.esm.js
- Minor warnings about browser compatibility for 'path' and 'url' modules

### Test Command Status
❌ **FAILED** - `bun run test`
- **50 test files failed** out of 51 total
- **34 individual test failures** out of 41 total tests
- **7 tests passed**

### Lint Command Status
❌ **FAILED** - `bun run lint`
- **14 ESLint errors** in src/backends/python.ts
- All errors related to undefined globals: console, process, window, URL
- Needs proper ESLint configuration for Node.js/browser environment

### Format Command Status
⚠️ **PARTIALLY PASSED** - `bun run format`
- Successfully formatted .ts files
- Error: No .tsx files found (pattern should be updated to only .ts)

---

## Critical Architecture Issues

### Missing Python-like `re` Object Export
**Priority: HIGH**
**Status: IDENTIFIED - NEEDS FIX**

The project's primary goal is to provide a Python-like `re` module interface, but the current exports only provide individual functions. Tests expect to import and use `re.sub()`, `re.search()`, etc., but the library doesn't export a `re` object.

**Current Exports (src/index.ts):**
- Individual functions: `sub()`, `search()`, `match()`, etc.
- Missing: `re` object with all methods

**Expected Usage (from failing tests):**
```typescript
import { re } from '@syntropiq/pyrex';
re.sub(pattern, replacement, string, {backend: 'python'});
```

**Impact:**
- 97% test failure rate due to `ReferenceError: re is not defined`
- Tests cannot access library functionality
- Core project promise not delivered

**Required Fix:**
1. Create `re` object export with all Python regex methods
2. Update API to support Python-like syntax options
3. Ensure backward compatibility with existing function exports

---

## Test Infrastructure Issues

### Syntax Errors in Test Files
**Priority: HIGH**
**Status: NEWLY IDENTIFIED**

Multiple test files have syntax errors preventing execution:

1. **test/python-backend/basic_tests.test.ts:101** - Unexpected "}"
2. **test/python-backend/general_su_tests.test.ts:108** - Unterminated string literal

### Python Backend Initialization Issues
**Priority: HIGH**
**Status: NEWLY IDENTIFIED**

Many tests timeout during Python backend initialization:
- Tests failing with 5000ms timeout
- Pyodide initialization appears to hang
- Pattern: `[MIRAI DEBUG] Starting Pyodide initialization...` followed by timeout

### Pattern Recognition Issues
**Priority: MEDIUM**
**Status: NEWLY IDENTIFIED**

Library incorrectly handling Python-specific regex patterns:
- Python named groups `(?P<name>...)` trigger "Use compileAsync()" errors
- Python version flags `(?V0)` and `(?V1)` not recognized
- Backref replacement `\1`, `\g<0>` not working correctly

---

## ESLint Configuration Issues

### Undefined Globals in Python Backend
**Priority: MEDIUM**
**Status: NEWLY IDENTIFIED**

14 ESLint errors in src/backends/python.ts:
- `console` not defined (10 instances)
- `process` not defined (1 instance)
- `window` not defined (1 instance)
- `URL` not defined (1 instance)

**Solution:** Update ESLint config to support Node.js and browser globals

---

## Formatting Configuration Issues

### Package.json Script Pattern Error
**Priority: LOW**
**Status: NEWLY IDENTIFIED**

Format script looks for non-existent .tsx files:
```json
"format": "prettier --write src/**/*.{ts,tsx}"
```

**Solution:** Remove .tsx from pattern since project only uses .ts files

---

## Previous Test Infrastructure Issues (STILL PRESENT)

❯ test/integration/performance.test.ts (9 tests | 2 failed) 6761ms
   × Performance and Stress Tests > Pattern Registry Performance > should demonstrate pattern reuse efficiency 5024ms
     → Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
   ✓ Performance and Stress Tests > Pattern Registry Performance > should show no performance degradation from registry overhead  491ms
   ✓ Performance and Stress Tests > Stress Testing > should handle large numbers of patterns  427ms
   × Performance and Stress Tests > Stress Testing > should handle concurrent pattern operations under load 70ms
     → expected 'REPLACED REPLACED REPLACED' to be 'REPLACED test operation' // Object.is equality
   ✓ Performance and Stress Tests > Stress Testing > should handle complex patterns without performance degradation  548ms
   ✓ Performance and Stress Tests > Memory Usage > should not leak memory with pattern creation and cleanup 85ms
   ✓ Performance and Stress Tests > Memory Usage > should handle batch operations efficiently 100ms
   ✓ Performance and Stress Tests > Edge Case Performance > should handle very long strings efficiently 5ms
   ✓ Performance and Stress Tests > Edge Case Performance > should handle patterns with many groups efficiently 7ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 20 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  test/basic.test.ts > Python Backend Registry System > Pattern Registry Core Functionality > should register and retrieve patterns by handle
Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ test/basic.test.ts:87:5
     85| 
     86|   describe('Pattern Registry Core Functionality', () => {
     87|     it('should register and retrieve patterns by handle', async () => {
       |     ^
     88|       const pattern = await re.compileAsync('(?P<word>\\w+)', 'i');
     89|       createdPatterns.push(pattern as PythonPattern);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/20]⎯

 FAIL  test/basic.test.ts > Python Backend Registry System > Pattern Lifecycle Management > should handle pattern creation, usage, and cleanup lifecycle
AssertionError: expected 'REPLACED REPLACED' to be 'REPLACED test' // Object.is equality

Expected: "REPLACED test"
Received: "REPLACED REPLACED"

 ❯ test/basic.test.ts:212:25
    210|       
    211|       const subResult = await pattern.sub('REPLACED', 'lifecycle test');
    212|       expect(subResult).toBe('REPLACED test');
       |                         ^
    213|       
    214|       // Cleanup

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/20]⎯

 FAIL  test/basic.test.ts > Python Backend Registry System > Pattern Registry Performance Verification > should show no performance degradation from registry overhead
AssertionError: expected 3.297804199999882 to be less than 1.938453999999183
 ❯ test/basic.test.ts:282:24
    280|       // Average time per operation should not significantly increase
    281|       // Allow for some variance but should be roughly similar
    282|       expect(multiple).toBeLessThan(single * 2);
       |                        ^
    283|     });
    284|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/20]⎯

 FAIL  test/basic.test.ts > Edge Cases and Stress Tests > should handle patterns with various flag combinations
AssertionError: expected 'a\nb' to be 'a\nb' // Object.is equality

- Expected
+ Received

- a\nb
+ a
+ b

 ❯ test/basic.test.ts:543:33
    541|       const result = await pattern.search(testCase.text);
    542|       if (testCase.expected) {
    543|         expect(result?.group()).toBe(testCase.expected);
       |                                 ^
    544|       }
    545|     }

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/20]⎯

 FAIL  test/integration/async-operations.test.ts > Async Operations Integration Tests > Backward Compatibility > should maintain backward compatibility for all async functions
Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ test/integration/async-operations.test.ts:18:5
     16| 
     17|   describe('Backward Compatibility', () => {
     18|     it('should maintain backward compatibility for all async functions', async () => {
       |     ^
     19|       const testString = TestStrings.CONTACT_INFO;
     20|       

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/20]⎯

 FAIL  test/integration/async-operations.test.ts > Async Operations Integration Tests > Performance and Efficiency > should handle concurrent async operations efficiently
AssertionError: expected undefined to be 'hello' // Object.is equality

- Expected: 
"hello"

+ Received: 
undefined

 ❯ test/integration/async-operations.test.ts:136:38
    134|       expect(endTime - startTime).toBeLessThan(3000);
    135|       
    136|       expect(searchResult1?.group()).toBe('hello');
       |                                      ^
    137|       expect(searchResult2?.group()).toBe('test');
    138|       expect(findallResult).toEqual(['123', '456', '789']);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/20]⎯

 FAIL  test/integration/async-operations.test.ts > Async Operations Integration Tests > Pattern Lifecycle Integration > should handle complete pattern lifecycle through async interface
AssertionError: expected 'REPLACED REPLACED' to be 'REPLACED test' // Object.is equality

Expected: "REPLACED test"
Received: "REPLACED REPLACED"

 ❯ test/integration/async-operations.test.ts:185:25
    183|       
    184|       const subResult = await pattern.sub('REPLACED', TestStrings.LIFECYCLE_TEST);
    185|       expect(subResult).toBe('REPLACED test');
       |                         ^
    186|       
    187|       // Explicit cleanup

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/20]⎯

 FAIL  test/integration/error-handling.test.ts > Error Handling Integration Tests > Pattern Handle Errors > should handle invalid handles gracefully
Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ test/integration/error-handling.test.ts:53:5
     51| 
     52|   describe('Pattern Handle Errors', () => {
     53|     it('should handle invalid handles gracefully', async () => {
       |     ^
     54|       const pattern = await re.compileAsync('(?P<error>\\w+)') as PythonPattern;
     55|       patternManager.track(pattern);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/20]⎯

 FAIL  test/integration/performance.test.ts > Performance and Stress Tests > Pattern Registry Performance > should demonstrate pattern reuse efficiency
Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ test/integration/performance.test.ts:18:5
     16| 
     17|   describe('Pattern Registry Performance', () => {
     18|     it('should demonstrate pattern reuse efficiency', async () => {
       |     ^
     19|       const pattern = await re.compileAsync('(?P<perf>\\w+)');
     20|       patternManager.track(pattern as PythonPattern);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/20]⎯

 FAIL  test/integration/performance.test.ts > Performance and Stress Tests > Stress Testing > should handle concurrent pattern operations under load
AssertionError: expected 'REPLACED REPLACED REPLACED' to be 'REPLACED test operation' // Object.is equality

Expected: "REPLACED test operation"
Received: "REPLACED REPLACED REPLACED"

 ❯ test/integration/performance.test.ts:148:25
    146|       // Verify other operations
    147|       expect(findallResult).toEqual(['concurrent', 'test', 'operation', 'extra', 'word']);
    148|       expect(subResult).toBe('REPLACED test operation');
       |                         ^
    149|     });
    150| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/20]⎯

 FAIL  test/unit/pattern-analyzer.test.ts > Pattern Analysis (Unit Tests) > Python Pattern Detection > should detect various Python-only flag combinations
AssertionError: expected 'javascript' to be 'python' // Object.is equality

Expected: "python"
Received: "javascript"

 ❯ test/unit/pattern-analyzer.test.ts:63:34
     61|       flagCombinations.forEach(flags => {
     62|         const analysis = re.analyze('\\w+', flags);
     63|         expect(analysis.backend).toBe('python');
       |                                  ^
     64|         expect(analysis.hasPythonFeatures).toBe(true);
     65|       });
 ❯ test/unit/pattern-analyzer.test.ts:61:24

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/20]⎯

 FAIL  test/unit/pattern-analyzer.test.ts > Pattern Analysis (Unit Tests) > Flag Analysis > should identify Python-only flags
AssertionError: expected 'javascript' to be 'python' // Object.is equality

Expected: "python"
Received: "javascript"

 ❯ test/unit/pattern-analyzer.test.ts:147:34
    145|       pythonOnlyFlags.forEach(flag => {
    146|         const analysis = re.analyze('\\w+', flag);
    147|         expect(analysis.backend).toBe('python');
       |                                  ^
    148|         expect(analysis.hasPythonFeatures).toBe(true);
    149|       });
 ❯ test/unit/pattern-analyzer.test.ts:145:23

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[12/20]⎯

 FAIL  test/unit/python-operations.test.ts > Python Pattern Operations (Unit Tests) > Search Operations > should return null when no match found
AssertionError: expected PythonMatch{ string: '123 456', …(7) } to be null

- Expected: 
null

+ Received: 
PythonMatch {
  "_data": {
    "end": 3,
    "endpos": 7,
    "groupdict": {
      "word": "123",
    },
    "groups": [
      "123",
      "123",
    ],
    "lastgroup": "word",
    "lastindex": 1,
    "pos": 0,
    "span": [
      0,
      3,
    ],
    "start": 0,
    "string": "123 456",
  },
  "_groups": [
    "123",
    "123",
  ],
  "endpos": 7,
  "lastgroup": "word",
  "lastindex": 1,
  "pos": 0,
  "re": PythonPattern {
    "_handle": "7e3cbb03-4a74-4a9c-9ced-9b801841aab4",
    "_pythonFlags": "",
    "flags": 8224,
    "groupindex": {
      "word": 1,
    },
    "groups": 1,
    "pattern": "(?P<word>\\w+)",
  },
  "string": "123 456",
}

 ❯ test/unit/python-operations.test.ts:37:22
     35|     it('should return null when no match found', async () => {
     36|       const result = await testPattern.search('123 456');
     37|       expect(result).toBeNull();
       |                      ^
     38|     });
     39|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[13/20]⎯

 FAIL  test/unit/python-operations.test.ts > Python Pattern Operations (Unit Tests) > Findall Operations > should return empty array when no matches found
AssertionError: expected [ '123', '456' ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "123",
+   "456",
+ ]

 ❯ test/unit/python-operations.test.ts:88:22
     86|     it('should return empty array when no matches found', async () => {
     87|       const result = await testPattern.findall('123 456');
     88|       expect(result).toEqual([]);
       |                      ^
     89|     });
     90|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[14/20]⎯

 FAIL  test/unit/python-operations.test.ts > Python Pattern Operations (Unit Tests) > Finditer Operations > should handle empty finditer results
AssertionError: expected [ '123', '456' ] to deeply equal []

- Expected
+ Received

- []
+ [
+   "123",
+   "456",
+ ]

 ❯ test/unit/python-operations.test.ts:109:23
    107|         matches.push(match.group() || '');
    108|       }
    109|       expect(matches).toEqual([]);
       |                       ^
    110|     });
    111|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[15/20]⎯

 FAIL  test/unit/python-operations.test.ts > Python Pattern Operations (Unit Tests) > Flag Handling > should handle multiline flag
PythonError: Traceback (most recent call last):
  File "/lib/python312.zip/_pyodide/_base.py", line 513, in eval_code
    CodeRunner(
  File "/lib/python312.zip/_pyodide/_base.py", line 285, in __init__
    self.ast = next(self._gen)
               ^^^^^^^^^^^^^^^
  File "/lib/python312.zip/_pyodide/_base.py", line 149, in _parse_and_compile_gen
    mod = compile(source, filename, mode, flags | ast.PyCF_ONLY_AST)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2
    pattern_obj = get_pattern("1cf063d5-e818-4e53-878e-bc942f0bfc45")
IndentationError: unexpected indent

 ❯ new_error node_modules/pyodide/pyodide.asm.js:10:10009
 ❯ null.<anonymous> wasm:/wasm/0268cb26:1:1500305
 ❯ null.<anonymous> wasm:/wasm/0268cb26:1:1500503
 ❯ Module._pythonexc2js node_modules/pyodide/pyodide.asm.js:10:721515
 ❯ callPyObjectKwargs node_modules/pyodide/pyodide.asm.js:10:63698
 ❯ Proxy.callKwargs node_modules/pyodide/pyodide.asm.js:10:80699
 ❯ Object.runPython node_modules/pyodide/pyodide.asm.js:10:110346
 ❯ PythonBackend.runPython src/backends/python.ts:154:35
    152|     await this.initialize();
    153|     try {
    154|       const result = this.pyodide.runPython(code);
       |                                   ^
    155|       
    156|       // Convert PyProxy objects to JavaScript objects
 ❯ PythonPattern.search src/backends/python.ts:334:23
 ❯ test/unit/python-operations.test.ts:185:22

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[16/20]⎯

 FAIL  test/unit/python-operations.test.ts > Python Pattern Operations (Unit Tests) > Flag Handling > should handle dotall flag
PythonError: Traceback (most recent call last):
  File "/lib/python312.zip/_pyodide/_base.py", line 513, in eval_code
    CodeRunner(
  File "/lib/python312.zip/_pyodide/_base.py", line 285, in __init__
    self.ast = next(self._gen)
               ^^^^^^^^^^^^^^^
  File "/lib/python312.zip/_pyodide/_base.py", line 149, in _parse_and_compile_gen
    mod = compile(source, filename, mode, flags | ast.PyCF_ONLY_AST)
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<exec>", line 2
    pattern_obj = get_pattern("a360b87c-ff5b-4000-98d1-5cfaa370d700")
IndentationError: unexpected indent

 ❯ new_error node_modules/pyodide/pyodide.asm.js:10:10009
 ❯ null.<anonymous> wasm:/wasm/0268cb26:1:1500305
 ❯ null.<anonymous> wasm:/wasm/0268cb26:1:1500503
 ❯ callPyObjectKwargs node_modules/pyodide/pyodide.asm.js:10:63698
 ❯ Proxy.callKwargs node_modules/pyodide/pyodide.asm.js:10:80699
 ❯ Object.runPython node_modules/pyodide/pyodide.asm.js:10:110346
 ❯ PythonBackend.runPython src/backends/python.ts:154:35
    152|     await this.initialize();
    153|     try {
    154|       const result = this.pyodide.runPython(code);
       |                                   ^
    155|       
    156|       // Convert PyProxy objects to JavaScript objects
 ❯ PythonPattern.search src/backends/python.ts:334:23
 ❯ test/unit/python-operations.test.ts:193:22

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[17/20]⎯

 FAIL  test/unit/python-registry.test.ts > Python Backend Registry System (Unit Tests) > Pattern Registration and Retrieval > should register patterns with unique handles
Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ test/unit/python-registry.test.ts:18:5
     16| 
     17|   describe('Pattern Registration and Retrieval', () => {
     18|     it('should register patterns with unique handles', async () => {
       |     ^
     19|       const pattern = await re.compileAsync(TestPatterns.SIMPLE_WORD, 'i');
     20|       patternManager.track(pattern as PythonPattern);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[18/20]⎯

 FAIL  test/unit/python-registry.test.ts > Python Backend Registry System (Unit Tests) > Pattern Compilation Efficiency > should prevent pattern recompilation through handle reuse
Error: Cannot find module '../../src/backends/python.js'
Require stack:
- /Users/steve/Projects/amjur.org/pyrex/test/utils/test-helpers.ts
 ❯ new PythonBackendSpy test/utils/test-helpers.ts:48:31
     46| 
     47|   constructor() {
     48|     const { PythonBackend } = require('../../src/backends/python.js');
       |                               ^
     49|     this.spy = vi.spyOn(PythonBackend, 'runPython');
     50|   }
 ❯ test/unit/python-registry.test.ts:58:19

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[19/20]⎯

 FAIL  test/unit/python-registry.test.ts > Python Backend Registry System (Unit Tests) > Pattern Registry Constraints > should handle concurrent pattern operations
AssertionError: expected [ Array(7) ] to deeply equal [ '', '', '', '' ]

- Expected
+ Received

  [
    "",
-   "",
-   "",
+   "word1",
+   "-",
+   "word2",
+   "-",
+   "word3",
    "",
  ]

 ❯ test/unit/python-registry.test.ts:201:27
    199|       
    200|       const splitResult = await pattern.split('word1-word2-word3');
    201|       expect(splitResult).toEqual(['', '', '', '']);
       |                           ^
    202|     });
    203|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[20/20]⎯


 Test Files  7 failed | 1 passed (8)
      Tests  20 failed | 125 passed (145)
   Start at  03:32:09