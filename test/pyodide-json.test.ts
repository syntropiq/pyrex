// Dynamically runs regex tests from pyodide_regex_tests.json using Vitest

import { describe, it, expect } from 'vitest';
// Debug: Log what we're trying to import
console.log('Attempting to import from:', '../src/index.ts');
import * as regex from '../src/index.ts';
console.log('Import successful, regex module:', Object.keys(regex));
import fs from 'fs';

// Load and parse the JSON test definitions
const testData = JSON.parse(
  fs.readFileSync(require.resolve('./utils/regex_test_patterns.json'), 'utf-8')
);

/**
 * TestCase interface is not used for new structure.
 * The new JSON structure contains:
 * - patterns: Array<{ method: string, pattern: string, flags: [], line: number }>
 * - assertions: Array<{ type: string, line: number, args_count: number }>
 * - other metadata
 */

describe('Pyodide Regex Test Suite', () => {
  for (const test of testData.tests) {
    // Each test has: name, patterns, assertions, etc.
    const { name, patterns, assertions, source_code } = test;

    describe(name, () => {
      // Map pattern line to pattern object for lookup
      const patternByLine = {};
      if (Array.isArray(patterns)) {
        for (const pat of patterns) {
          patternByLine[pat.line] = pat;
        }
      }

      // For each assertion, run the corresponding regex operation
      if (Array.isArray(assertions)) {
        for (const assertion of assertions) {
          const pat = patternByLine[assertion.line];
          if (!pat) continue;

          const testTitle = `Line ${assertion.line}: ${pat.method}(${JSON.stringify(pat.pattern)})`;

          it(testTitle, async () => {
            let result;
            try {
              // Handler skeleton for all function types
              switch (pat.method) {
                case 'compile':
                  // Handler for regex.compile(pattern, flags)
                  // Typically used to create a pattern object for further operations
                  // Example: const compiled = regex.compile(pat.pattern, ...pat.flags)
                  // Not directly assertable, but may be used in subsequent assertions
                  // For now, just check compile does not throw
                  await expect(async () => (regex as any).compile(pat.pattern, ...(pat.flags || []))).not.toThrow();
                  break;

                case 'escape':
                  // Handler for regex.escape(pattern)
                  // Example: regex.escape(pat.pattern)
                  result = (regex as any).escape(pat.pattern);
                  // Expected value should be in assertion or test.expected
                  // TODO: Map expected value
                  break;

                case 'findall':
                  // Handler for regex.findall(pattern, input)
                  // TODO: Map input and expected from test/assertion
                  break;

                case 'finditer':
                  // Handler for regex.finditer(pattern, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'fullmatch':
                  // Handler for regex.fullmatch(pattern, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'match':
                  // Handler for regex.match(pattern, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'search':
                  // Handler for regex.search(pattern, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'split':
                  // Handler for regex.split(pattern, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'splititer':
                  // Handler for regex.splititer(pattern, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'sub':
                  // Handler for regex.sub(pattern, repl, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'subf':
                  // Handler for regex.subf(pattern, repl, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'subfn':
                  // Handler for regex.subfn(pattern, repl, input)
                  // TODO: Implement logic and expected mapping
                  break;

                case 'subn':
                  // Handler for regex.subn(pattern, repl, input)
                  // TODO: Implement logic and expected mapping
                  break;

                default:
                  throw new Error(`Unsupported function: ${pat.method} at line ${pat.line}`);
              }
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              throw new Error(
                `Test failed for ${pat.method}("${pat.pattern}") at line ${pat.line}: ${errorMessage}`
              );
            }
          });
        }
      }
    });
  }
});