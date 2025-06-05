// TypeScript script to convert Python unittest regex.sub tests to TypeScript Vitest tests

import * as fs from 'fs';

const pyPath = 'test/split/basic_tests.py';
const tsOutPath = 'test/python-backend/converted_basic_tests.test.ts';

const pyContent = fs.readFileSync(pyPath, 'utf-8');

function extractTests(py: string) {
  const lines = py.split('\n');
  const tests: { py: string; pattern: string; repl: string; input: string; expected: string }[] = [];
  const assertEqRegex = /self\.assertEqual\s*\(\s*regex\.sub\((.+?)\),\s*([^\)]+)\)/;

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].trim();
    if (line.startsWith('self.assertEqual(') && line.includes('regex.sub')) {
      // Try to parse arguments
      const m = assertEqRegex.exec(line);
      if (m) {
        const args = m[1].split(',').map(s => s.trim());
        const expected = m[2].trim();
        tests.push({
          py: line,
          pattern: args[0],
          repl: args[1],
          input: args[2],
          expected,
        });
      } else {
        // Multi-line or complex, try to join next lines
        let joined = line;
        let j = i + 1;
        while (!joined.includes(')') && j < lines.length) {
          joined += lines[j].trim();
          j++;
        }
        const m2 = assertEqRegex.exec(joined);
        if (m2) {
          const args = m2[1].split(',').map(s => s.trim());
          const expected = m2[2].trim();
          tests.push({
            py: joined,
            pattern: args[0],
            repl: args[1],
            input: args[2],
            expected,
          });
        }
        i = j - 1;
      }
    }
  }
  return tests;
}

function pyArgToTs(arg: string) {
  // Remove r/b prefixes, convert quotes, basic mapping
  let s = arg.trim();
  s = s.replace(/^r?b?["']/, '"').replace(/["']$/, '"');
  return s;
}

function pyExpectedToTs(expected: string) {
  let s = expected.trim();
  if (s.startsWith('chr(')) {
    // e.g. chr(9)+chr(10)
    s = s.replace(/chr\((\d+)\)/g, (m, n) => `String.fromCharCode(${n})`);
    s = s.replace(/\+/g, ' + ');
  }
  if (s.startsWith('b"') || s.startsWith('b\'')) {
    s = s.replace(/^b/, '');
  }
  return s;
}

function toTsTest({ pattern, repl, input, expected, py }: any, idx: number) {
  // Handle lambda or function references in repl
  let tsRepl = repl;
  if (repl.includes('lambda') || repl.match(/self\.\w+/)) {
    tsRepl = '// TODO: Manual conversion needed for callable replacement';
  } else {
    tsRepl = pyArgToTs(repl);
  }
  const tsPattern = pyArgToTs(pattern);
  const tsInput = pyArgToTs(input);
  const tsExpected = pyExpectedToTs(expected);

  let comment = '';
  if (tsRepl.startsWith('//')) {
    comment = `// Python: ${py}`;
  }

  return `
  it('test ${idx + 1}', () => {
    ${comment}
    expect(sub(${tsPattern}, ${tsRepl}, ${tsInput})).toBe(${tsExpected});
  });`;
}

const tests = extractTests(pyContent);

const tsTestFile = `import { describe, it, expect } from 'vitest';
// Auto-converted from test/split/basic_tests.py

// You must implement or import a 'sub' function that mimics Python's regex.sub behavior.

describe('Python Backend - Basic Regex (converted)', () => {
${tests.map(toTsTest).join('\n')}
});
`;

fs.writeFileSync(tsOutPath, tsTestFile);

console.log('Conversion complete. Output written to', tsOutPath);