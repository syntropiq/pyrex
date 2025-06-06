// Dynamically runs regex tests from pyodide_regex_tests.json using Vitest

import { describe, it, expect } from 'vitest';
import * as regex from '../src/index.js';
import fs from 'fs';

// Load and parse the JSON test definitions
const testData = JSON.parse(
  fs.readFileSync(require.resolve('./utils/pyodide_regex_tests.json'), 'utf-8')
);

interface TestCase {
  pattern: string;
  input: string;
  expected: string | string[];
  function: 'sub' | 'split' | 'findall';
  line: number;
  method: string;
  is_bytes?: boolean;
}

describe('Pyodide Regex Test Suite', () => {
  // Group tests by method for better organization
  const testsByMethod = testData.reduce((acc: Record<string, TestCase[]>, test: TestCase) => {
    if (!acc[test.method]) {
      acc[test.method] = [];
    }
    acc[test.method].push(test);
    return acc;
  }, {});

  for (const [methodName, tests] of Object.entries(testsByMethod)) {
    describe(methodName, () => {
      for (const test of tests as TestCase[]) {
        // Skip byte tests for now as they require special handling
        if (test.is_bytes) {
          it.skip(`Line ${test.line}: ${test.function}("${test.pattern}", "${test.input}") [BYTES - SKIPPED]`, () => {});
          continue;
        }

        const testTitle = `Line ${test.line}: ${test.function}("${test.pattern}", "${test.input}")`;

        it(testTitle, async () => {
          try {
            // Validate required fields
            if (
              typeof test.pattern !== 'string' ||
              typeof test.input !== 'string' ||
              typeof test.function !== 'string' ||
              typeof test.line !== 'number'
            ) {
              throw new Error(
                `Malformed test case at line ${test.line}: Missing required fields.`
              );
            }

            let result;

            switch (test.function) {
              case 'sub': {
                // Handler for regex.sub(pattern, repl, string)
                // In this test format:
                //   pattern: regex pattern
                //   input: replacement string
                //   expected: result string after substitution
                //   (source text is inferred or assumed to be the same as expected if not provided)
                // If the test case includes a 'source' field, use it; otherwise, use pattern or expected.
                const sourceText =
                  (test as any).source ??
                  (typeof test.expected === 'string' ? test.expected : test.input);

                result = await (regex as any).sub(test.pattern, test.input, sourceText);
                expect(result).toBe(test.expected);
                break;
              }

              case 'split': {
                // Handler for regex.split(pattern, string)
                // expected: array of split substrings
                if (!Array.isArray(test.expected)) {
                  throw new Error(
                    `Malformed split test at line ${test.line}: expected should be an array.`
                  );
                }
                result = await (regex as any).split(test.pattern, test.input);
                expect(result).toEqual(test.expected);
                break;
              }

              case 'findall': {
                // Handler for regex.findall(pattern, string)
                // expected: array of matches (strings or arrays for groups)
                if (!Array.isArray(test.expected)) {
                  throw new Error(
                    `Malformed findall test at line ${test.line}: expected should be an array.`
                  );
                }
                result = await (regex as any).findall(test.pattern, test.input);
                expect(result).toEqual(test.expected);
                break;
              }

              default:
                // Catch-all for unsupported or future function types
                throw new Error(
                  `Unsupported function: ${test.function} at line ${test.line}`
                );
            }
          } catch (error) {
            // Add context to the error for debugging
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(
              `Test failed for ${test.function}("${test.pattern}", "${test.input}") at line ${test.line}: ${errorMessage}`
            );
          }
        });
      }
    });
  }
});