// Dynamically runs regex tests described in extracted-regex-tests.json using Vitest

import { describe, it, expect } from 'vitest';
import * as re from '../src/index.js';
import fs from 'fs';

// Load and parse the JSON test definitions
const testData = JSON.parse(
  fs.readFileSync(require.resolve('./utils/extracted-regex-tests.json'), 'utf-8')
);

describe('Pythonic Regex JSON Test Suite', () => {
  for (const test of testData.tests) {
    // Only run tests with assertions
    if (!test.assertions || test.assertions.length === 0) continue;

    describe(test.name, () => {
      // Parse the source_code lines for mapping to assertions
      const lines = test.source_code.split('\n').map(line => line.trim());

      test.assertions.forEach((assertion, idx) => {
        // Try to extract the Python assertion line
        const pyLine = lines.find(line => line.includes('assert'));

        // Fallback: use the assertion type and index
        const testTitle = pyLine
          ? `Python: ${pyLine}`
          : `${assertion.type} assertion #${idx + 1}`;

        it(testTitle, async () => {
          // Example: handle assertEqual for regex.search/match
          // This is a minimal mapping; extend as needed for more assertion types
          if (assertion.type === 'assertEqual' && pyLine) {
            // Example: self.assertEqual(regex.search('a*', 'xxx').span(0), (0, 0))
            // Parse pattern, input, method, expected result
            const searchMatch = pyLine.match(/regex\.(search|match)\((.+?),\s*(.+?)\)\.(\w+)\((.*?)\)/);
            const noneMatch = pyLine.match(/regex\.(search|match)\((.+?),\s*(.+?)\),\s*None/);

            if (searchMatch) {
              const [, method, pattern, input, spanMethod, spanArg] = searchMatch;
              const patternStr = eval(pattern); // e.g. "'a*'" => "a*"
              const inputStr = eval(input);

              const result = await (re as any)[method](patternStr, inputStr);
              if (result === null) {
                throw new Error('Expected match, got null');
              }
              let actual;
              if (spanMethod === 'span') {
                if (spanArg) {
                  actual = result.span(Number(spanArg));
                } else {
                  actual = result.span();
                }
              } else {
                throw new Error('Unknown span method');
              }
              // Extract expected tuple from Python line
              const expectedMatch = pyLine.match(/\),\s*\((\d+),\s*(\d+)\)\)?/);
              if (!expectedMatch) throw new Error('Could not parse expected tuple');
              const expected = [Number(expectedMatch[1]), Number(expectedMatch[2])];
              expect(actual).toEqual(expected);
            } else if (noneMatch) {
              const [, method, pattern, input] = noneMatch;
              const patternStr = eval(pattern);
              const inputStr = eval(input);
              const result = await (re as any)[method](patternStr, inputStr);
              expect(result).toBeNull();
            } else {
              throw new Error('Unsupported assertion line: ' + pyLine);
            }
          } else {
            throw new Error('Unsupported assertion type: ' + assertion.type);
          }
        });
      });
    });
  }
});